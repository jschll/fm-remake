/**
 * Form block component - Dynamic form builder with various field types
 */

import { useState, type FormEvent } from 'react';
import type { BlockComponentProps } from '../../types/blocks';
import type { FormBlockData, FormField } from '../../types/block-data';

export default function FormBlock({
  id,
  data,
}: BlockComponentProps<FormBlockData>) {
  const { title, fields, submitText = 'Submit', onSubmit } = data;
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    fieldName: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        const response = await fetch(onSubmit, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        console.log('Form submitted successfully');
        setFormData({});
      } else {
        console.log('Form data:', formData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={`${id}-${field.name}`}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="form-block__textarea"
          />
        );

      case 'select':
        return (
          <select
            id={`${id}-${field.name}`}
            name={field.name}
            required={field.required}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="form-block__select"
          >
            <option value="">{field.placeholder || 'Select...'}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={`${id}-${field.name}`}
            name={field.name}
            required={field.required}
            checked={value as boolean}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            className="form-block__checkbox"
          />
        );

      case 'email':
      case 'text':
      default:
        return (
          <input
            type={field.type}
            id={`${id}-${field.name}`}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="form-block__input"
          />
        );
    }
  };

  return (
    <div id={id} className="form-block">
      {title && <h2 className="form-block__title">{title}</h2>}
      <form onSubmit={handleSubmit} className="form-block__form">
        {fields.map((field) => (
          <div key={field.name} className="form-block__field">
            <label
              htmlFor={`${id}-${field.name}`}
              className="form-block__label"
            >
              {field.label}
              {field.required && (
                <span className="form-block__required">*</span>
              )}
            </label>
            {renderField(field)}
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="form-block__submit"
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </button>
      </form>
    </div>
  );
}
