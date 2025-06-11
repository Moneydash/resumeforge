import type { ResumeFormData } from "@/types/interface.resume-form-data";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import {
  Controller,
  type Control,
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayAppend,
  type UseFormRegister
} from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import MonthPicker from "../MonthPicker";

interface EducationFieldsComponentInterface {
  sectionDivClasses: string;
  sectionHeaderClasses: string;
  appendEducation: UseFieldArrayAppend<ResumeFormData>;
  addButtonClasses: string;
  educationFields: FieldArrayWithId<ResumeFormData>[];
  cardClasses: string;
  removeEducation: (index: number) => void;
  removeButtonClasses: string;
  errors: FieldErrors<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  labelClasses: string;
  inputClasses: string;
  control: Control<ResumeFormData>;
}

const EducationFieldsComponent: React.FC<EducationFieldsComponentInterface> = ({
  sectionDivClasses,
  sectionHeaderClasses,
  appendEducation,
  addButtonClasses,
  educationFields,
  cardClasses,
  removeEducation,
  removeButtonClasses,
  errors,
  register,
  labelClasses,
  inputClasses,
  control
}) => {
  return(
    <>
      <div className="space-y-4">
        <div className={`${sectionDivClasses} flex justify-between items-center`}>
          <h2 className={sectionHeaderClasses}>Education</h2>
          <button
            type="button"
            onClick={() => appendEducation({ degree: '', institution: '', startDate: '', endDate: '' })}
            className={addButtonClasses}
          >
            <CirclePlusIcon size={15} style={{ marginRight: 5, marginBottom: 0.3 }} /> Add Education
          </button>
        </div>
        
        {educationFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Education #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className={removeButtonClasses}
              >
                <Trash2Icon size={15} style={{ marginRight: 5, marginBottom: 1 }}/> Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className={labelClasses}>Degree *</Label>
                <Input
                  {...register(`education.${index}.degree`)}
                  className={inputClasses}
                  placeholder="Bachelor of Science in Computer Science"
                />
                {errors.education?.[index]?.degree && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.degree?.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label className={labelClasses}>Institution *</Label>
                <Input
                  {...register(`education.${index}.institution`)}
                  className={inputClasses}
                  placeholder="University Name"
                />
                {errors.education?.[index]?.institution && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.institution?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={labelClasses}>Start Date *</Label>
                <Controller
                  name={`education.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <MonthPicker
                      value={field.value}
                      setValue={field.onChange}
                      monthPlaceholder="Select Month"
                      yearPlaceholder="Select Year"
                      monthRequired={true}
                      yearRequired={true}
                    />
                  )}
                />
                {errors.education?.[index]?.startDate && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.startDate?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>End Date</label>
                <Controller
                  name={`education.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <MonthPicker
                      value={field.value}
                      setValue={field.onChange}
                      monthPlaceholder="Select Month"
                      yearPlaceholder="Select Year"
                      monthRequired={false}
                      yearRequired={false}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(EducationFieldsComponent);