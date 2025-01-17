import React from "react";
import NotAvaliable from "../../_components/NotAvaliable";
import { FormBlockInstance } from "@/types";
import FormSubmitComponent from "../../_components/FormSubmitComponent";
import { fetchPublishFormById } from "@/actions/form-action";

interface BuilderPageProps {
  params: Promise<{
    formId: string;
  }>
}

const Page = async ({ params }: BuilderPageProps) => {
  const { formId } = await params;

  const { form } = await fetchPublishFormById(formId);

  if (!form) {
    return <NotAvaliable />;
  }

  const blocks = JSON.parse(form.jsonBlocks) as FormBlockInstance[];
  return <FormSubmitComponent formId={formId} blocks={blocks} />;
};

export default Page;
