import db from '@/db';
import { CareerTable } from '@/db/schema';
import { env } from '@/lib/env/server';
import { sanityCareerWebhookSchema } from '@/lib/zodValidations';
import { eq } from 'drizzle-orm';
import { parseBody } from 'next-sanity/webhook';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    const { isValidSignature, body } = await parseBody<any>(
      req,
      env.SANITY_CAREER_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid Signature' },
        { status: 401 },
      );
    }

    const result = sanityCareerWebhookSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid Payload' }, { status: 422 });
    }

    const { _id, name: position, isRemote, location, postedAt } = result.data;

    if (operation === 'delete') {
      await db
        .update(CareerTable)
        .set({
          isDeleted: true,
        })
        .where(eq(CareerTable.id, _id));

      return NextResponse.json({ status: 204 });
    }

    await db
      .insert(CareerTable)
      .values({
        sanityId: _id,
        position,
        isRemote,
        location,
        isDeleted: false,
        postedAt: new Date(postedAt),
      })
      .onConflictDoUpdate({
        target: CareerTable.id,
        set: {
          position,
          isRemote,
          location,
          isDeleted: false,
          postedAt: new Date(postedAt),
          updatedAt: new Date(),
        },
      });

    return NextResponse.json(
      { message: 'Career added successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
