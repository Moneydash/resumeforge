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
import { Textarea } from "../ui/textarea";

interface AwardFieldsComponentInterface {
  sectionDivClasses: string;
  sectionHeaderClasses: string;
  appendAward: UseFieldArrayAppend<ResumeFormData>;
  addButtonClasses: string;
  awardFields: FieldArrayWithId<ResumeFormData>[];
  cardClasses: string;
  removeAward: (index: number) => void;
  removeButtonClasses: string;
  inputClasses: string;
  register: UseFormRegister<ResumeFormData>;
  labelClasses: string;
  errors: FieldErrors<ResumeFormData>;
  control: Control<ResumeFormData>;
}

const AwardFieldsComponent: React.FC<AwardFieldsComponentInterface> = ({
  sectionDivClasses,
  sectionHeaderClasses,
  appendAward,
  addButtonClasses,
  awardFields,
  cardClasses,
  removeAward,
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
          <h2 className={sectionHeaderClasses}>Awards & Achievements</h2>
          <button
            type="button"
            onClick={() => appendAward({ title: '', date: '', description: '' })}
            className={addButtonClasses}
          >
            <CirclePlusIcon size={15} style={{ marginRight: 5, marginBottom: 0.3 }} /> Add Award
          </button>
        </div>
        
        {awardFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Award #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeAward(index)}
                className={removeButtonClasses}
              >
                <Trash2Icon size={15} style={{ marginRight: 5, marginBottom: 1 }}/> Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={labelClasses}>Award Title *</Label>
                <Input
                  {...register(`awards.${index}.title`)}
                  className={inputClasses}
                  placeholder="Employee of the Year"
                />
                {errors.awards?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.awards[index]?.title?.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label className={labelClasses}>Date *</Label>
                <Controller
                  control={control}
                  name={`awards.${index}.date`}
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
                {errors.awards?.[index]?.date && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.awards[index]?.date?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <Label className={labelClasses}>Description</Label>
              <Textarea
                {...register(`awards.${index}.description`)}
                rows={2}
                className={inputClasses}
                placeholder="Brief description of the award..."
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(AwardFieldsComponent);