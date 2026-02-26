import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { env } from '@/lib/env/server';
import { sanityProductWebhookSchema } from '@/lib/zodValidations';
import db from '@/db';
import { ProductTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    const { isValidSignature, body } = await parseBody<any>(
      req,
      env.SANITY_PRODUCT_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid Signature' },
        { status: 401 },
      );
    }

    const result = sanityProductWebhookSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid Payload' }, { status: 422 });
    }

    const { _id, mainImages: imageUrl, numberInStock, basePrice } = result.data;

    if (operation === 'delete') {
      await db
        .update(ProductTable)
        .set({
          isDeleted: true,
        })
        .where(eq(ProductTable.id, _id));

      return NextResponse.json({ stauts: 204 });
    }

    await db
      .insert(ProductTable)
      .values({
        sanityId: _id,
        basePriceInCents: Math.round(Number(basePrice) * 100),
        imageUrl: imageUrl.asset.url,
        numberInStocks: numberInStock,
        status: 'published',
      })
      .onConflictDoUpdate({
        target: ProductTable.sanityId,
        set: {
          basePriceInCents: Math.round(Number(basePrice) * 100),
          imageUrl: imageUrl.asset.url,
          numberInStocks: numberInStock,
          status: 'published',
          updatedAt: new Date(),
        },
      });

    return NextResponse.json(
      { message: 'Product Successfully Added' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
