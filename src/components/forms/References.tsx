import type { ResumeFormData } from "@/types/interface.resume-form-data";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFormRegister
} from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ReferencesFieldsComponentInterface {
  sectionDivClasses: string;
  sectionHeaderClasses: string;
  appendReference: UseFieldArrayAppend<ResumeFormData>;
  addButtonClasses: string;
  referenceFields: FieldArrayWithId<ResumeFormData>[];
  cardClasses: string;
  removeReference: (index: number) => void;
  removeButtonClasses: string;
  errors: FieldErrors<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  labelClasses: string;
  inputClasses: string;
}

const ReferencesFieldsComponent: React.FC<ReferencesFieldsComponentInterface> = ({
  sectionDivClasses,
  sectionHeaderClasses,
  appendReference,
  addButtonClasses,
  referenceFields,
  cardClasses,
  removeReference,
  removeButtonClasses,
  errors,
  register,
  labelClasses,
  inputClasses
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className={`${sectionDivClasses} flex justify-between items-center`}>
          <h2 className={sectionHeaderClasses}>References</h2>
          <button
            type="button"
            onClick={() => appendReference({ name: '', title: '', company: '', email: '', phone: '' })}
            className={addButtonClasses}
          >
            <CirclePlusIcon size={15} style={{ marginRight: 5, marginBottom: 0.3 }} /> Add Reference
          </button>
        </div>
        
        {referenceFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Reference #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeReference(index)}
                className={removeButtonClasses}
              >
                <Trash2Icon size={15} style={{ marginRight: 5, marginBottom: 1 }}/> Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <Label className={labelClasses}>Full Name *</Label>
                <Input
                  {...register(`references.${index}.name`)}
                  className={inputClasses}
                  placeholder="John Doe"
                />
                {errors.references?.[index]?.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label className={labelClasses}>Job Title *</Label>
                <Input
                  {...register(`references.${index}.title`)}
                  className={inputClasses}
                  placeholder="Senior Manager"
                />
                {errors.references?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.title?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <Label className={labelClasses}>Company *</Label>
              <Input
                {...register(`references.${index}.company`)}
                className={inputClasses}
                placeholder="Company Name"
              />
              {errors.references?.[index]?.company && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.references[index]?.company?.message}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <Label className={labelClasses}>Email *</Label>
                <Input
                  type="email"
                  {...register(`references.${index}.email`)}
                  className={inputClasses}
                  placeholder="john.doe@company.com"
                />
                {errors.references?.[index]?.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.email?.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label className={labelClasses}>Phone *</Label>
                <Input
                  type="tel"
                  {...register(`references.${index}.phone`)}
                  className={inputClasses}
                  placeholder="+1-234-567-8900"
                />
                {errors.references?.[index]?.phone && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.phone?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReferencesFieldsComponent;