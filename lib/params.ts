import { AddonAttributes } from "../data/models/addon";
import { VariantAttributes } from "../data/models/variant";

export interface AddProductParams {
  addons?: AddonAttributes[];
  variants?: VariantAttributes[];
  id: number;
  product_type_id: number;
  name: string;
  description?: string;
  product_images: any[];
  status: string;
  created_at: Date;
  updated_at: Date;
}