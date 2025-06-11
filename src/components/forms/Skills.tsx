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

interface SkillsFieldsComponentInterface {
  sectionDivClasses: string;
  sectionHeaderClasses: string;
  appendSkill: UseFieldArrayAppend<ResumeFormData>;
  addButtonClasses: string;
  skillsFields: FieldArrayWithId<ResumeFormData>[];
  cardClasses: string;
  removeSkill: (index: number) => void;
  removeButtonClasses: string;
  errors: FieldErrors<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  labelClasses: string;
  inputClasses: string;
}

const SkillsFieldsComponent: React.FC<SkillsFieldsComponentInterface> = ({
  sectionDivClasses,
  sectionHeaderClasses,
  appendSkill,
  addButtonClasses,
  skillsFields,
  cardClasses,
  removeSkill,
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
          <h2 className={sectionHeaderClasses}>Skills</h2>
          <button
            type="button"
            onClick={() => appendSkill({ name: '', keywords: [] })}
            className={addButtonClasses}
          >
            <CirclePlusIcon size={15} style={{ marginRight: 5, marginBottom: 0.3 }} /> Add Skill
          </button>
        </div>
        {skillsFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Skill #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className={removeButtonClasses}
              >
                <Trash2Icon size={15} style={{ marginRight: 5, marginBottom: 1 }}/> Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className={labelClasses}>Skill *</Label>
                <Input
                  {...register(`skills.${index}.name`)}
                  className={inputClasses}
                  placeholder="Programming Language"
                />
                {errors.skills?.[index]?.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.skills[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label className={labelClasses}>Keywords</Label>
                <Input
                  {...register(`skills.${index}.keywords`)}
                  className={inputClasses}
                  placeholder="PHP, Java, Javascript(separate with commas)"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(SkillsFieldsComponent);