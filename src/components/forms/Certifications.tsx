import type { ResumeFormData } from "@/types/interface.resume-form-data";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import MonthPicker from "../MonthPicker";

interface CertificationFieldsComponentInterface {
  sectionDivClasses: string;
  sectionHeaderClasses: string;
  appendCertification: UseFieldArrayAppend<ResumeFormData>;
  addButtonClasses: string;
  certificationFields: FieldArrayWithId<ResumeFormData>[];
  cardClasses: string;
  removeCertification: (index: number) => void;
  removeButtonClasses: string;
  errors: FieldErrors<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  labelClasses: string;
  inputClasses: string;
  watch: UseFormWatch<ResumeFormData>;
  setValue: UseFormSetValue<ResumeFormData>;
}

const CertificationFieldsComponent: React.FC<CertificationFieldsComponentInterface> = ({
  sectionDivClasses,
  sectionHeaderClasses,
  appendCertification,
  addButtonClasses,
  certificationFields,
  cardClasses,
  removeCertification,
  removeButtonClasses,
  errors,
  register,
  labelClasses,
  inputClasses,
  watch,
  setValue
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className={`${sectionDivClasses} flex justify-between items-center`}>
          <h2 className={sectionHeaderClasses}>Certifications</h2>
          <button
            type="button"
            onClick={() => appendCertification({ name: '', issuingOrganization: '', date: '' })}
            className={addButtonClasses}
          >
            <CirclePlusIcon size={15} style={{ marginRight: 5, marginBottom: 0.3 }} /> Add Certification
          </button>
        </div>
        
        {certificationFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Certification #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className={removeButtonClasses}
              >
                <Trash2Icon size={15} style={{ marginRight: 5, marginBottom: 1 }}/> Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className={labelClasses}>Certification Name *</Label>
                <Input
                  {...register(`certifications.${index}.name`)}
                  className={inputClasses}
                  placeholder="AWS Certified Solutions Architect"
                />
                {errors.certifications?.[index]?.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label className={labelClasses}>Issuing Organization *</Label>
                <Input
                  {...register(`certifications.${index}.issuingOrganization`)}
                  className={inputClasses}
                  placeholder="Amazon Web Services"
                />
                {errors.certifications?.[index]?.issuingOrganization && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.issuingOrganization?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Date Obtained *</label>
                <MonthPicker
                  value={watch('certifications')[index].date}
                  setValue={newValue => setValue(`certifications.${index}.date`, newValue)}
                  monthPlaceholder="Select Month"
                  yearPlaceholder="Select Year"
                  monthRequired={true}
                  yearRequired={true}
                />
                {errors.certifications?.[index]?.date && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.date?.message}
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

export default CertificationFieldsComponent;