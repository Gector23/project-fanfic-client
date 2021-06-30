import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";

const ChapterForm = ({ showEditForm, chapterData, onHideEditForm, onUpdateChapter }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const validationRules = {
    name: {
      required: { value: true, message: "Chapter name is required" },
      minLength: { value: 10, message: "Chapter name min length is 10" },
      maxLength: { value: 80, message: "Chapter name max length is 80" },
      value: chapterData.name
    }
  };

  const onSubmit = data => {
    let update = {};
    if (data.name !== chapterData.name) {
      update.name = data.name;
    }
    onUpdateChapter(update);
  };

  return (
    <Modal show={showEditForm} onHide={onHideEditForm} >
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Form.Control
              isInvalid={errors.name}
              type="text"
              placeholder="Fanfic name"
              {...register("name", { ...validationRules.name })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </div>
          <div className="text-center">
            <Button variant="primary" type="submit">{chapterData ? "Update chapter" : "Create chapter"}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChapterForm;