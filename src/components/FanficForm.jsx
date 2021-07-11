import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";

import useFandoms from "../hooks/useFandoms";

import TagField from "./TagField";

const checkTagChange = tags => {
  for (const tag of tags) {
    if (!tag._id) {
      return true;
    }
  };
  return false;
};

const defaultData = {
  name: "",
  description: "",
  fandom: null,
  tags: [],
  default: true
};

const FanficForm = ({ initialData = defaultData, onHideEditForm, onSetFanfic }) => {
  const tagsRef = useRef();
  const fandoms = useFandoms();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const validationRules = {
    name: {
      required: { value: true, message: "Fanfic name is required" },
      minLength: { value: 10, message: "Fanfic name min length is 10" },
      maxLength: { value: 80, message: "Fanfic name max length is 80" }
    },
    description: {
      required: { value: true, message: "Description is required" },
      minLength: { value: 20, message: "Description min length is 20" },
      maxLength: { value: 80, message: "Description max length is 80" }
    },
    fandom: {
      required: { value: true, message: "Fandom is required" }
    }
  };

  const onSubmit = data => {
    let fanficData = {};
    const tags = tagsRef.current.value;
    if (data.name !== initialData.name) {
      fanficData.name = data.name;
    }
    if (data.description !== initialData.description) {
      fanficData.description = data.description;
    }
    if (data.fandom !== initialData.fandom?._id) {
      fanficData.fandom = data.fandom;
    }
    if (tags.length !== initialData.tags.length || checkTagChange(tags)) {
      fanficData.tags = tags.map(tag => {
        return {
          value: tag.value,
          _id: tag._id
        };
      });
    }
    if (!tags.length) {
      fanficData.tags = [];
    }
    onSetFanfic(fanficData);
  };

  return (
    <Modal show={true} onHide={onHideEditForm} >
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Form.Control
              isInvalid={errors.name}
              type="text"
              placeholder="Fanfic name"
              defaultValue={initialData.name}
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
              defaultValue={initialData.description}
              rows={3}
              {...register("description", { ...validationRules.description })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </div>
          {fandoms.length && (
            <div className="mb-3">
              <Form.Control
                as="select"
                isInvalid={errors.fandom}
                defaultValue={initialData.fandom?._id}
                {...register("fandom", { ...validationRules.fandom })}
              >
                {fandoms.map(fandom => {
                  return <option key={fandom._id} value={fandom._id}>{fandom.name}</option>
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.fandom?.message}
              </Form.Control.Feedback>
            </div>
          )}
          <div className="mb-3">
            <TagField ref={tagsRef} initialTags={initialData.tags} />
          </div>
          <div className="text-center">
            <Button variant="primary" type="submit">{initialData.default ? "Create fanfic" : "Update fanfic"}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FanficForm;