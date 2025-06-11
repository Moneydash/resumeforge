import type { ResumeFormData } from "@/types/interface.resume-form-data";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import {
  Controller,
  type Control,
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayAppend,
  type UseFormRegister,
} from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import MonthPicker from "../MonthPicker";
import EditorComponent from "../EditorComponent";

interface ExperienceFieldsComponentInterface {
  sectionDivClasses: string;
  sectionHeaderClasses: string;
  appendExperience: UseFieldArrayAppend<ResumeFormData>;
  addButtonClasses: string;
  experienceFields: FieldArrayWithId<ResumeFormData>[];
  cardClasses: string;
  removeExperience: (index: number) => void;
  removeButtonClasses: string;
  inputClasses: string;
  register: UseFormRegister<ResumeFormData>;
  labelClasses: string;
  errors: FieldErrors<ResumeFormData>;
  control: Control<ResumeFormData>;
}

const ExperienceFieldsComponent: React.FC<ExperienceFieldsComponentInterface> = ({
  sectionDivClasses,
  sectionHeaderClasses,
  appendExperience,
  addButtonClasses,
  experienceFields,
  cardClasses,
  removeExperience,
  inputClasses,
  removeButtonClasses,
  register,
  labelClasses,
  errors,
  control
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className={`${sectionDivClasses} flex justify-between items-center`}>
          <h2 className={sectionHeaderClasses}>Experience</h2>
          <button
            type="button"
            onClick={() => appendExperience({ title: '', company: '', startDate: '', endDate: '', description: '' })}
            className={addButtonClasses}
          >
            <CirclePlusIcon size={15} style={{ marginRight: 5, marginBottom: 0.3 }} /> Add Experience
          </button>
        </div>
        
        {experienceFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Experience #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className={removeButtonClasses}
              >
                <Trash2Icon size={15} style={{ marginRight: 5, marginBottom: 1 }}/> Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={labelClasses}>Job Title *</Label>
                <Input
                  {...register(`experience.${index}.title`)}
                  className={inputClasses}
                  placeholder="Software Engineer"
                />
                {errors.experience?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.title?.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label className={labelClasses}>Company *</Label>
                <Input
                  {...register(`experience.${index}.company`)}
                  className={inputClasses}
                  placeholder="Company Name"
                />
                {errors.experience?.[index]?.company && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.company?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClasses}>Start Date *</label>
                <Controller
                  control={control}
                  name={`experience.${index}.startDate`}
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
                {errors.experience?.[index]?.startDate && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.startDate?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>End Date</label>
                <Controller
                  control={control}
                  name={`experience.${index}.endDate`}
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
            
            <div>
              <label className={labelClasses}>Description</label>
              <Controller
                control={control}
                name={`experience.${index}.description`}
                render={({ field }) => (
                  <EditorComponent
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
              <p className="text-xs text-gray-500 mt-1 ml-1">
                Press Enter for new lines. These will be preserved when generating your resume.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(ExperienceFieldsComponent);