import { useHistory } from "react-router";
import { Form, FormControl, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import queryString from "query-string";

const SearchForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const history = useHistory();

  const validationRules = {
    search: {
      required: { value: true, message: "Search is empty" },
      maxLength: { value: 20, message: "Search string max length is 20" }
    }
  };

  const onSubmit = data => {
    const query = queryString.stringify({
      searchString: data.search
    });
    history.push(`/search?${query}`);
    reset({ search: "" });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="my-2 my-lg-0 mr-auto" inline>
      <FormControl
        className="mr-sm-2"
        type="text"
        placeholder="Search"
        isInvalid={errors.search}
        {...register("search", { ...validationRules.search })}
      />
      <Button className="my-2 my-sm-0" variant="outline-success" type="submite">Search</Button>
    </Form>
  );
};

export default SearchForm;