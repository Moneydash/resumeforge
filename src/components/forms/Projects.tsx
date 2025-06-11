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
import { Textarea } from "../ui/textarea";

interface ProjectFieldsComponentInterface {
  sectionDivClasses: string;
  sectionHeaderClasses: string;
  appendProject: UseFieldArrayAppend<ResumeFormData>;
  addButtonClasses: string;
  projectFields: FieldArrayWithId<ResumeFormData>[];
  cardClasses: string;
  removeProject: (index: number) => void;
  removeButtonClasses: string;
  errors: FieldErrors<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  labelClasses: string;
  inputClasses: string;
}

const ProjectFieldsComponent: React.FC<ProjectFieldsComponentInterface> = ({
  sectionDivClasses,
  sectionHeaderClasses,
  appendProject,
  addButtonClasses,
  projectFields,
  cardClasses,
  removeProject,
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
          <h2 className={sectionHeaderClasses}>Projects</h2>
          <button
            type="button"
            onClick={() => appendProject({ title: '', description: '', technologies: [] })}
            className={addButtonClasses}
          >
            <CirclePlusIcon size={15} style={{ marginRight: 5, marginBottom: 0.3 }} /> Add Project
          </button>
        </div>
        
        {projectFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Project #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className={removeButtonClasses}
              >
                <Trash2Icon size={15} style={{ marginRight: 5, marginBottom: 1 }}/> Remove
              </button>
            </div>
            
            <div>
              <Label className={labelClasses}>Project Title *</Label>
              <Input
                {...register(`projects.${index}.title`)}
                className={inputClasses}
                placeholder="E-commerce Platform"
              />
              {errors.projects?.[index]?.title && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.projects[index]?.title?.message}
                </p>
              )}
            </div>
            
            <div>
              <Label className={labelClasses}>Description</Label>
              <Textarea
                {...register(`projects.${index}.description`)}
                rows={3}
                className={inputClasses}
                placeholder="Describe the project, your role, and key achievements..."
              />
            </div>
            
            <div>
              <Label className={labelClasses}>Technologies Used</Label>
              <Input
                {...register(`projects.${index}.technologies`)}
                className={inputClasses}
                placeholder="React, Node.js, MongoDB (separate with commas)"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(ProjectFieldsComponent);