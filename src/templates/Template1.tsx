type Product = {
  code: string;
  model: string;
  name: string;
};

type Client = {
  id: string;
  name: string;
};

export function Template1({ product, client, meetingUrl }: { product: Product; client: Client; meetingUrl: string; }) {

  return (
    <div className="py-10 w-[500px] mx-auto text-sm">
      <p>
        ★Kaps-All
        <span className="text-black font-semibold"> {product.code}</span>{" "}
        Quotation Follow Up (
        <span className="text-black font-semibold">
          Ceramic Industrial Coating
        </span>
        )★
      </p>
      <br />

      <p>
        Dear <span className="text-black font-semibold">{client.name}</span>,
      </p>
      <p>
        On <span className="text-black font-semibold">February 1, 2023</span> we
        quoted you a{" "}
        <span className="text-black font-semibold">{product.model}</span>. We
        would appreciate an opportunity to review this proposal with you. Please
        click below link to schedule some time to review this proposal or any
        other needs you may have.
      </p>
      <br />
      <p className="my-5">
        <a
          href={meetingUrl}
          className="px-5 py-3 rounded-xl bg-red-600 text-white font-bold"
        >
          Click Here To Schedule a Zoom Call to Review Proposal
        </a>
      </p>
      <br />
      <p>
        I have also enclosed our quick reference guide, which briefly covers our
        complete line of Packaging Systems. If you require more of our
        literature, digital literature can be found on our website HERE.
      </p>
      <br />
      <p>Sincerely,</p>
      <br />
      <p>
        Kaps-All Packaging Systems, Inc. - The Proven Standard®... since 1941
      </p>
      <p>Michael Herzog</p>
      <br />
      <div className="text-xs">
        <p className="font-bold text-red-800">Sales</p>
        <p>
          <span className="font-semibold">e-Mail:</span>
          <a href="asd">asdasd</a>
        </p>
        <p>
          <span className="font-semibold">Phone:</span>
          <a href="tel:631-727-0300">631-727-0300</a>
        </p>
        <p>
          <span className="font-semibold">Website:</span>
          <a href="http://www.KapsAll.com">http://www.KapsAll.com</a>
        </p>
        <br />
        <p className="font-bold text-red-800">Northern Facility:</p>
        <p>200 Mill Road</p>
        <p>Riverhead, NY 11901</p>
        <br />
        <p className="font-bold text-red-800">Southern Facility:</p>
        <p>251 North Congress Ave.</p>
        <p>Delray Beach, FL 33445</p>
      </div>
    </div>
  );
}
