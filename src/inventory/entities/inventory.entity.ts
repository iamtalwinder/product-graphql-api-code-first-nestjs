import { Schema, Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema as SchemaDecorator } from '@nestjs/mongoose';
import { Base } from 'src/common';
import { Product } from 'src/product';
import { InventoryLocation } from './inventory-location.entity';

@ObjectType()
@SchemaDecorator()
export class Inventory extends Base {
  @Field(() => Product)
  @Prop({ type: String, ref: Product.name, required: true, unique: true })
  product: Product | string;

  @Field(() => [InventoryLocation])
  @Prop({ type: [InventoryLocation], default: [] })
  inventoryLocations: InventoryLocation[];

  getTotalQuantity: Function;
}

export type InventoryDocument = Inventory & Document;

export const InventorySchema: Schema = SchemaFactory.createForClass(Inventory);

InventorySchema.method('getTotalQuantity', function (this: Inventory): number {
  return this.inventoryLocations.reduce((total, location) => {
    return total + location.quantity;
  }, 0);
});
