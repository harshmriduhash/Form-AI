import { RowLayoutBlock } from "@/components/blocks/layouts/RowLayout";
import { RadioSelectBlock } from "@/components/blocks/childLayouts/RadioSelectionBlock";
import { FormBlocksType } from "@/types";
import { TextFieldBlock } from "@/components/blocks/childLayouts/TextFieldBlock";
import { EmailFieldBlock } from "@/components/blocks/childLayouts/EmailFieldBlock";
import { TextAreaBlock } from "@/components/blocks/childLayouts/TextAreaBlock";
import { HeadingBlock } from "@/components/blocks/childLayouts/HeadingBlock";
import { StarRatingBlock } from "@/components/blocks/childLayouts/StarRatingBlock";
import { ParagraphBlock } from "@/components/blocks/childLayouts/ParagraphBlock";
import { PhoneFieldBlock } from "@/components/blocks/childLayouts/PhoneFieldBlock";

export const FormBlocks: FormBlocksType = {
    RowLayout: RowLayoutBlock,
    RadioSelect: RadioSelectBlock,
    TextField: TextFieldBlock,
    EmailField: EmailFieldBlock,
    TextArea: TextAreaBlock,
    Heading: HeadingBlock,
    StarRating: StarRatingBlock,
    Paragraph: ParagraphBlock,
    PhoneField: PhoneFieldBlock
}