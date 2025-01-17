import { FormBlocks } from "@/lib/form-blocks";
import { TChildProperties } from "@/types";
import React from "react";

const ChildPropertiesComponentWrapper = ({
  positionIndex,
  parentId,
  blockInstance,
}: TChildProperties) => {
  const PropertiesComponent =
    FormBlocks[blockInstance.blockType].propertiesComponent;
  if (!PropertiesComponent) return null;

  return (
    <PropertiesComponent
      positionIndex={positionIndex}
      parentId={parentId}
      blockInstance={blockInstance}
    />
  );
};

export default ChildPropertiesComponentWrapper;
