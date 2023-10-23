import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateBooking } from "./useCreateBooking";
import { useEditBooking } from "./useEditBooking";
import { formatCurrency, subtractDates } from "../../utils/helpers";
import { useCabins } from "../cabins/useCabins";
import { useAllGuests } from "../Guests/useAllGuests";
import { StyledSelect } from "../../ui/Select";
import { useSettings } from "../settings/useSettings";
import { isFuture, isPast, isToday } from "date-fns";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { isEditing, editBooking } = useEditBooking();

  const { cabins } = useCabins();
  const { guests } = useAllGuests();
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  // console.log(breakfastPrice,maxGuestsPerBooking);

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession
      ? editValues
      : {
          startDate: null,
          endDate: null,
          numNights: "",
        },
  });
  const { errors } = formState;

  function onSubmit(data) {
    const numNights = subtractDates(data.endDate, data.startDate);

    const cabinPrice = numNights * data.cabinPrice;

    const extrasPrice = data.hasBreakfast
      ? breakfastPrice * data.numGuests * numNights
      : 0;

    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (isPast(new Date(data.endDate)) && !isToday(new Date(data.endDate)))
      status = "checked-out";
    if (isFuture(new Date(data.startDate)) || isToday(new Date(data.startDate)))
      status = "unconfirmed";
    if (
      (isFuture(new Date(data.endDate)) || isToday(new Date(data.endDate))) &&
      isPast(new Date(data.startDate)) &&
      !isToday(new Date(data.startDate))
    )
      status = "checked-in";
    if (isEditSession)
      editBooking(
        {
          newBookingData: {
            ...data,
            numNights: numNights,
            cabinPrice: cabinPrice,
            extrasPrice: extrasPrice,
            totalPrice: totalPrice,
            status: status,
          },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createBooking(
        {
          ...data,
          numNights: numNights,
          cabinPrice: cabinPrice,
          extrasPrice: extrasPrice,
          totalPrice: totalPrice,
          status: status,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    // console.log({
    //   ...data,
    //   numNights: numNights,
    //   cabinPrice: cabinPrice,
    //   extrasPrice: extrasPrice,
    //   totalPrice: totalPrice,
    //   status: status,
    // });
  }

  function onError(errors) {
    // console.log("Wrong Details booking Form", errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label={"Start Date:"} error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isWorking}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label={"End Date:"} error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isWorking}
          {...register("endDate", {
            required: "This Field is Required",
            // valueAsDate: true,

            validate: (v) =>
              (subtractDates(v, getValues().startDate) >= minBookingLength &&
                subtractDates(v, getValues().startDate) <= maxBookingLength) ||
              "Please Enter Valid Date",
          })}
        />
      </FormRow>
      <FormRow label="Cabin Name" error={errors?.cabinId?.message}>
        <StyledSelect
          defaultValue={"default"}
          {...register("cabinId", {
            required: "This field is required",
          })}>
          <option value={"default"} disabled>
            Name-(Capacity)
          </option>
          {cabins?.map((cabin, idx) => {
            return (
              <option key={idx} value={cabin.id}>
                {cabin.name} - ({cabin.maxCapacity})
              </option>
            );
          })}
        </StyledSelect>
      </FormRow>
      <FormRow label="Cabin Price X 1" error={errors?.cabinPrice?.message}>
        <StyledSelect
          defaultValue={"default"}
          {...register("cabinPrice", {
            required: "This field is required",
          })}>
          <option value={"default"} disabled>
            Name-Price-Discount{" "}
          </option>

          {cabins?.map((cabin, idx) => {
            return (
              <option key={idx} value={cabin.regularPrice - cabin?.discount}>
                {cabin.name}-{formatCurrency(cabin.regularPrice)} -
                {formatCurrency(cabin.discount)}
              </option>
            );
          })}
        </StyledSelect>
      </FormRow>
      <FormRow label="Guest Name" error={errors?.guestId?.message}>
        <StyledSelect
          defaultValue={"default"}
          {...register("guestId", {
            required: "This field is required",
          })}>
          <option value={"default"} disabled>
            (ID)-Full Name{" "}
          </option>
          {guests?.map((guest, idx) => {
            return (
              <option key={idx} value={guest.id}>
                ({guest.id})-{guest.fullName}
              </option>
            );
          })}
        </StyledSelect>
      </FormRow>
      <FormRow label="Number of Guests:" error={errors?.numGuests?.message}>
        <Input
          type="number"
          className="w-100"
          id="numGuests"
          disabled={isWorking}
          {...register("numGuests", {
            required: "This field is required",
            validate: (v) => v <= maxGuestsPerBooking || "Limit exceeded",
          })}
        />
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="text"
          id="observations"
          disabled={isWorking}
          {...register("observations")}
        />
      </FormRow>
      <label htmlFor="hasBreakfast">Do You Want To Add Breakfast?</label>
      &nbsp; &nbsp;
      <Input
        type="checkbox"
        id="hasBreakfast"
        disabled={isWorking}
        {...register("hasBreakfast")}
      />
      &nbsp; &nbsp; &nbsp;
      <label htmlFor="isPaid">Amount Paid?</label>
      &nbsp; &nbsp;
      <Input
        type="checkbox"
        id="isPaid"
        disabled={isWorking}
        {...register("isPaid")}
      />
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit booking" : "Create new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
