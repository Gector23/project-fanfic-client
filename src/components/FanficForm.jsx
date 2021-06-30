import { useRef } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";

import TagField from "./TagField";

const checkTagChange = tags => {
  for (const tag of tags) {
    if (!tag._id) {
      return true;
    }
  };
  return false;
};

const FanficForm = ({ showEditForm, fanficData, onHideEditForm, onUpdateFanfic }) => {
  const tagsRef = useRef();
  const fandoms = useSelector(state => state.fandoms);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const validationRules = {
    name: {
      required: { value: true, message: "Fanfic name is required" },
      minLength: { value: 10, message: "Fanfic name min length is 10" },
      maxLength: { value: 80, message: "Fanfic name max length is 80" },
      value: fanficData.name
    },
    description: {
      required: { value: true, message: "Description is required" },
      minLength: { value: 20, message: "Description min length is 20" },
      maxLength: { value: 80, message: "Description max length is 80" },
      value: fanficData.description
    },
    fandom: {
      required: { value: true, message: "Fandom is required" }
    }
  };

  const onSubmit = data => {
    let update = {};
    const tags = tagsRef.current.value;
    if (data.name !== fanficData.name) {
      update.name = data.name;
    }
    if (data.description !== fanficData.description) {
      update.description = data.description;
    }
    if (data.fandom !== fanficData.fandom._id) {
      update.fandom = data.fandom;
    }
    if (tags.length !== fanficData.tags.length || checkTagChange(tags)) {
      update.tags = tags.map(tag => {
        return {
          value: tag.value,
          _id: tag._id
        };
      });
    }
    onUpdateFanfic(update);
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
          <div className="mb-3">
            <Form.Control
              isInvalid={errors.description}
              as="textarea"
              placeholder="Fanfic description"
              rows={3}
              {...register("description", { ...validationRules.description })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Form.Control
              as="select"
              isInvalid={errors.fandom}
              {...register("fandom", { ...validationRules.fandom })}
            >
              {fandoms.map(fandom => {
                const selected = fandom._id === fanficData.fandom._id;
                return <option key={fandom._id} defaultValue={selected} value={fandom._id}>{fandom.name}</option>
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.fandom?.message}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <TagField ref={tagsRef} initialTags={fanficData.tags} />
          </div>
          <div className="text-center">
            <Button variant="primary" type="submit">{fanficData ? "Update fanfic" : "Create fanfic"}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FanficForm;