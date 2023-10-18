import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";

import FormRow from "../../ui/FormRow";
import { StyledSelect } from "../../ui/Select";

import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";
import flags from "../../data/flags.json";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { isCreating, createGuest } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession
      ? editValues
      : {
          fullName: "",
          email: "",
          nationalID: NaN,
          countryFlag: "",
          image: null,
        },
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data?.image : data?.image[0];

    function getKeyByValue(object, value) {
      return Object?.keys(object)?.find((key) => object[key] === value);
    }

    const countryCode = getKeyByValue(flags, data?.nationality);
    console.log(countryCode);
    const countryFlag = `https://flagcdn.com/${countryCode}.svg`;
    // const countryFlag = `https://flagcdn.com/${data?.nationality}.svg`;
    // const nation = data.nationality
    // const nationality = flags[data?.nationality]?.toUpperCase();

    if (isEditSession)
      editGuest(
        { newGuestData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createGuest(
        {
          ...data,
          image: image,
          countryFlag: countryFlag,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
            validate: {
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Email address must be a valid address",
            },
          })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="number"
          id="nationalID"
          disabled={isWorking}
          {...register("nationalID", {
            required: "This field is required",
            minLength: 12 || "National ID should be of 12 digit ",
          })}
        />
      </FormRow>

      {/* <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isWorking}
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow> */}
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <StyledSelect
          defaultValue={"default"}
          {...register("nationality", {
            required: isEditSession ? false : "This field is required",
          })}
        >
          <option value={"default"} disabled>
            Country Name
          </option>
          {Object.entries(flags).map(([val, label], idx) => {
            return (
              <option key={idx} value={label}>
                {label.toUpperCase()}
              </option>
            );
          })}
        </StyledSelect>
      </FormRow>

      <FormRow label="Guest photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit guest" : "Create new guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
