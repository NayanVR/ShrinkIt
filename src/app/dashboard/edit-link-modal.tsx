import { DashboardLinkComponent } from "@/lib/types/dashboard";
import { validateUrlForm } from "@/lib/validations/forms";
import { Modal } from "@mantine/core";
import { useFormik } from "formik";
import { ChangeEvent, useEffect } from "react";

interface EditLinkModalProps {
  opened: boolean;
  close: () => void;
  link: DashboardLinkComponent;
  updateLink: (link: DashboardLinkComponent) => void;
}

export default function EditLinkModal(props: EditLinkModalProps) {
  const formik = useFormik({
    initialValues: props.link,
    validate: validateUrlForm,
    onSubmit: (values: DashboardLinkComponent) => {
      props.updateLink(values);
    },
  });

  useEffect(() => {
    formik.setValues(props.link);
  }, [props.link]);

  function handleCustomURLChange(event: ChangeEvent<HTMLInputElement>): void {
    const newURL =
      formik.values.shrinkURL.split("/")[0] + "/" + event.target.value;
    formik.setFieldValue("shrinkURL", newURL);
  }

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title="Edit Link"
      overlayProps={{
        opacity: 0.7,
        blur: 3,
      }}
      classNames={{
        body: "bg-dark border-white border-b border-l border-r rounded-br-lg rounded-bl-lg",
        header:
          "bg-dark border-white border-t border-l border-r rounded-tr-lg rounded-tl-lg",
      }}
      centered
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col max-w-md w-full gap-2"
      >
        {formik.errors.name && (
          <div className="text-error text-sm">{formik.errors.name}</div>
        )}
        <div className="w-full flex items-center">
          <label
            htmlFor="name"
            className="bg-[#222222] px-2 sm:px-3 py-2.5 sm:py-2 text-sm sm:text-base border border-gray rounded-l-md"
          >
            Name
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            id="name"
            type="text"
            placeholder="Name"
            className="px-4 py-2 w-full border border-gray bg-dark text-white placeholder:text-gray rounded-r-md"
          />
        </div>
        {formik.errors.originalURL && (
          <div className="text-error text-sm">{formik.errors.originalURL}</div>
        )}
        <div className="w-full flex items-center">
          <label
            htmlFor="originalURL"
            className="bg-[#222222] px-2 sm:px-3 py-2.5 sm:py-2 text-sm sm:text-base border border-gray rounded-l-md"
          >
            URL
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.originalURL}
            id="originalURL"
            type="url"
            placeholder="Enter Your URL"
            className="px-4 py-2 w-full border border-gray bg-dark text-white placeholder:text-gray rounded-r-md"
          />
        </div>
        {formik.errors.originalURL && (
          <div className="text-error text-sm">{formik.errors.originalURL}</div>
        )}
        {formik.values.isCustom && (
          <div className="w-full flex items-center">
            <label
              htmlFor="shrinkURL"
              className="bg-[#222222] px-2 sm:px-3 py-2.5 sm:py-2 text-sm sm:text-base border border-gray rounded-l-md"
            >
              {formik.values.shrinkURL.split("/")[0] + "/"}
            </label>
            <input
              onChange={handleCustomURLChange}
              value={formik.values.shrinkURL.split("/")[1]}
              id="shrinkURL"
              type="text"
              placeholder="Enter Your URL"
              className="px-4 py-2 w-full border border-gray bg-dark text-white placeholder:text-gray rounded-r-md"
            />
          </div>
        )}
        <button
          type="submit"
          className="group py-2 bg-white hover:bg-dark hover:text-white text-dark border border-primary rounded-md transition-all relative"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}
