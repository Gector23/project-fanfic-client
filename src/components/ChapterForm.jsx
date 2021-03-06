import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";

const defaultData = {
  name: "",
  default: true
};

const ChapterForm = ({ showEditForm, initialData = defaultData, onHideEditForm, onSetChapter }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const validationRules = {
    name: {
      required: { value: true, message: "Chapter name is required" },
      minLength: { value: 10, message: "Chapter name min length is 10" },
      maxLength: { value: 80, message: "Chapter name max length is 80" }
    },
    image: {
      validate: {
        defaultRequired: files => !files.length && initialData.default ? "Image is required" : null,
        isImage: files => files.length && !files[0].type.match(/image/) ? "The selected file is not a image" : null
      }
    }
  };

  const onSubmit = data => {
    let chapterData = {};
    let chapterFile = new FormData();
    if (data.name !== initialData.name) {
      chapterData.name = data.name;
    }
    if (data.image.length) {
      chapterFile.append("image", data.image[0]);
    }
    onSetChapter({ chapterData, chapterFile });
    reset(defaultData);
  };

  return (
    <Modal show={showEditForm} onHide={onHideEditForm} >
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Form.Control
              isInvalid={errors.name}
              type="text"
              placeholder="Chapter name"
              defaultValue={initialData.name}
              {...register("name", { ...validationRules.name })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Form.Control
              isInvalid={errors.image}
              type="file"
              {...register("image", { ...validationRules.image })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image?.message}
            </Form.Control.Feedback>
          </div>
          <div className="text-center">
            <Button variant="primary" type="submit">{initialData.default ? "Create chapter" : "Update chapter"}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChapterForm;