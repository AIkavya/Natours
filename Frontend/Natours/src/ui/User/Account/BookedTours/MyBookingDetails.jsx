import useMyBookingDetails from "../../../../features/hooks/BookingHooks/useMyBookingDeatils"
import { useParams } from "react-router-dom"
import  { useState } from "react";
import {
  FileText,
  Eye,
  Download,
  ExternalLink,
  Compass,
  Building2,
  User,
  CreditCard,
  DollarSign,
  PhoneCall,
  Bookmark,
  ShieldCheck,
  Info,
} from "lucide-react";

import {
  GlobalStyle,
  Page,
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  Grid,
  InfoItem,
  Label,
  Value,
  LinkValue,
  DocumentCard,
  DocumentImage,
  DocumentImagePlaceholder,
  ButtonGroup,
  ActionButton,
  StatusBadge,
  HeaderSection,
  HeaderCoverImage,
  HeaderContent,
  HeaderTitle,
  HeaderMetaGrid,
  HeaderBadgeGroup,
  TravelerCard,
  TravelerTitle,
  DocumentsSubTitle,
  DocumentGrid,
  DocumentTitle,
  DocumentDetailRow,
  DocumentDetailLabel,
  DocumentDetailValue,
  ChecklistGrid,
  ChecklistItem,
  CheckIcon,
  
  ReuploadButton,

} from "./MyBookingDetails.styles.js";


const formatDate = (dateString) => {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.log(error);
    return "—";
  }
};

const formatStatus = (status) => {
  if (!status) return "—";
  const formatted = status
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
  return formatted;
};

const DocPreviewImage = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <DocumentImagePlaceholder>
        <FileText size={28} />
        <span>Preview Unavailable</span>
      </DocumentImagePlaceholder>
    );
  }

  return (
    <DocumentImage
      src={src}
      alt={alt || "Document Preview"}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

import useCurrencyDetector from "../../../../Services/useCurrencyDetector";
import useReuploadBookingDocument from "../../../../features/hooks/BookingHooks/useReuploadBookingDocument";
function MyBookingDetails() {
  const { formatCurrency } = useCurrencyDetector();
  const { bookingid } = useParams();
  const { booking } = useMyBookingDetails(bookingid);
  const { reuploadDocument : handleReupload, isPending : isReuploading } = useReuploadBookingDocument();


const handleFileChange = (e, idx, doc ) => {
  const file = e.target.files?.[0];
  if (!file) return;

  handleReupload({
    bookingId: booking._id,
    travelerIndex: idx,
    docType: doc.key,
    file,
  });

 
};

  const safeData =
    booking && typeof booking === "object" ? booking : {};

  // Safely extract sub-objects with fallbacks
  const tour =
    safeData?.tour && typeof safeData.tour === "object" ? safeData.tour : {};
  const selectedHotel =
    safeData?.selectedHotel && typeof safeData.selectedHotel === "object"
      ? safeData.selectedHotel
      : {};
  const payment =
    safeData?.payment && typeof safeData.payment === "object"
      ? safeData.payment
      : {};
  const travelers = Array.isArray(safeData?.travelers)
    ? safeData.travelers
    : [];
  const emergencyContact =
    safeData?.emergencyContact && typeof safeData.emergencyContact === "object"
      ? safeData.emergencyContact
      : {};
  const termsAndPolicy =
    safeData?.termsAndPolicy && typeof safeData.termsAndPolicy === "object"
      ? safeData.termsAndPolicy
      : {};

  const bookingNumber = safeData?.bookingNumber;
  const bookingStatus = safeData?.bookingStatus;
  const packageName = safeData?.packageName;
  const travelDate = safeData?.travelDate;
  const pricePerPerson = safeData?.pricePerPerson;
  const totalAmount = safeData?.totalAmount;
  const amountPaid = safeData?.amountPaid;
  const remainingAmount = safeData?.remainingAmount;
  const createdAt = safeData?.createdAt;
  const updatedAt = safeData?.updatedAt;
  const _id = safeData?._id;
  const user = safeData?.user;

  const coverImageUrl =
    tour?.imageCover?.secureUrl ||
    (typeof tour?.imageCover === "string" ? tour.imageCover : null);

  // Helper for document file URL extraction
  const getDocUrl = (docObj) => {
    if (!docObj) return null;
    if (typeof docObj.file === "string") return docObj.file;
    if (docObj.file && typeof docObj.file.secureUrl === "string")
      return docObj.file.secureUrl;
    if (typeof docObj.secureUrl === "string") return docObj.secureUrl;
    if (typeof docObj.url === "string") return docObj.url;
    return null;
  };

  // Destinations formatting
  const destinationsText =
    Array.isArray(tour?.destinations) && tour.destinations.length > 0
      ? tour.destinations
          .map((d) => d?.city || d?.state || d?.country)
          .filter(Boolean)
          .join(", ")
      : "—";



  // Policies checklist map
  const termsMap =
    termsAndPolicy?.terms && typeof termsAndPolicy.terms === "object"
      ? termsAndPolicy.terms
      : {};
  const policyItems = [
    { key: "refundPolicy", label: "Refund Policy" },
    { key: "cancellationPolicy", label: "Cancellation Policy" },
    { key: "failedPaymentPolicy", label: "Failed Payment Policy" },
    { key: "insurancePolicy", label: "Insurance Policy" },
    {
      key: "documentVerificationPolicy",
      label: "Document Verification Policy",
    },
    {
      key: "criminalAndImmigrationPolicy",
      label: "Criminal & Immigration Policy",
    },
    { key: "travelerInformationPolicy", label: "Traveler Information Policy" },
    { key: "thirdPartyServicesPolicy", label: "Third Party Services Policy" },
    { key: "healthDeclarationPolicy", label: "Health Declaration Policy" },
    { key: "termsAndConditions", label: "Terms & Conditions" },
  ].filter((p) => termsMap[p.key] === true);

  return (
    <>
      <GlobalStyle />
      <Page>
        {/* Header Section */}
        <HeaderSection>
          <div>
            {coverImageUrl ? (
              <HeaderCoverImage
                src={coverImageUrl}
                alt={tour.name || "Tour Cover"}
                loading="lazy"
              />
            ) : (
              <DocumentImagePlaceholder style={{ height: "260px" }}>
                <Compass size={40} />
                <span>No Cover Image</span>
              </DocumentImagePlaceholder>
            )}
          </div>
          <HeaderContent>
            <HeaderTitle>{tour.name || "Tour Details"}</HeaderTitle>

            <HeaderBadgeGroup>
              <StatusBadge>Booking: {formatStatus(bookingStatus)}</StatusBadge>
              <StatusBadge>Payment: {formatStatus(payment.status)}</StatusBadge>
            </HeaderBadgeGroup>

            <HeaderMetaGrid>
              <InfoItem>
                <Label>Theme</Label>
                <Value>{tour.theme || "—"}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Duration</Label>
                <Value>
                  {tour.duration
                    ? `${tour.duration.days || 0} Days / ${tour.duration.nights || 0} Nights`
                    : "—"}
                </Value>
              </InfoItem>
              <InfoItem>
                <Label>Booking No.</Label>
                <Value>{bookingNumber || "—"}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Travel Date</Label>
                <Value>{formatDate(travelDate)}</Value>
              </InfoItem>
            </HeaderMetaGrid>
          </HeaderContent>
        </HeaderSection>

        {/* 1. Travel Information */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <Compass size={20} />
              Travel Information
            </SectionTitle>
            <SectionSubtitle>
              Details regarding your upcoming itinerary and package
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            <InfoItem>
              <Label>Tour Name</Label>
              <Value>{tour.name || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Theme</Label>
              <Value>{tour.theme || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Package</Label>
              <Value>{packageName || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Duration</Label>
              <Value>
                {tour.duration
                  ? `${tour.duration.days || 0} Days / ${tour.duration.nights || 0} Nights`
                  : "—"}
              </Value>
            </InfoItem>
            <InfoItem>
              <Label>Travel Date</Label>
              <Value>{formatDate(travelDate)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Start Location</Label>
              <Value>{tour.startLocation || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Destinations</Label>
              <Value>{destinationsText}</Value>
            </InfoItem>
          </Grid>
        </Section>

        {/* 2. Hotel Information */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <Building2 size={20} />
              Hotel Information
            </SectionTitle>
            <SectionSubtitle>
              Accommodations reserved for your itinerary
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            <InfoItem>
              <Label>Hotel Name</Label>
              <Value>{selectedHotel.name || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Room Type</Label>
              <Value>{selectedHotel.roomType || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Rating</Label>
              <Value>
                {selectedHotel.rating ? `${selectedHotel.rating} / 5` : "—"}
              </Value>
            </InfoItem>
            <InfoItem>
              <Label>Website</Label>
              {selectedHotel.website ? (
                <LinkValue
                  href={selectedHotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website{" "}
                  <ExternalLink
                    size={12}
                    style={{ marginLeft: "4px", display: "inline" }}
                  />
                </LinkValue>
              ) : (
                <Value>—</Value>
              )}
            </InfoItem>
          </Grid>
        </Section>

        {/* 3. Traveler Information & 4. Travel Documents */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <User size={20} />
              Traveler Information
            </SectionTitle>
            <SectionSubtitle>
              Personal details and verified travel documentation for all
              travelers
            </SectionSubtitle>
          </SectionHeader>

          {travelers.length === 0 ? (
            <Value>No traveler information available.</Value>
          ) : (
            travelers.map((traveler, idx) => {
              const docs = traveler.travelDocuments || {};
              const passport = docs.passport || {};
              const nationalId = docs.nationalId || {};
              const visa = docs.visa || {};
              const insurance = docs.insurance || {};

const documents = [
  {
    key: "passport",
    title: "Passport",
    preview: getDocUrl(passport),
    details: [
      {
        label: "Number",
        value: passport.number || "—",
      },
      {
        label: "Expiry",
        value: formatDate(passport.expiry),
      },
    ],
  },
  {
    key: "nationalId",
    title: "National ID",
    preview: getDocUrl(nationalId),
    details: [
      {
        label: "Type",
        value: nationalId.type
          ? formatStatus(nationalId.type)
          : "—",
      },
      {
        label: "Number",
        value: nationalId.number || "—",
      },
    ],
  },
  {
    key: "visa",
    title: "Visa",
    preview: getDocUrl(visa),
    details: [
      {
        label: "Visa Number",
        value: visa.number || "—",
      },
      {
        label: "Expiry",
        value: formatDate(visa.expiry),
      },
    ],
  },
  {
    key: "insurance",
    title: "Insurance",
    preview: getDocUrl(insurance),
    details: [
      {
        label: "Provider",
        value: insurance.provider || "—",
      },
      {
        label: "Policy No.",
        value: insurance.policyNumber || "—",
      },
    ],
  },
];

             

             
              return (
                <TravelerCard key={idx}>
                  <TravelerTitle>
                    Traveler {idx + 1}: {traveler.firstName || ""}{" "}
                    {traveler.lastName || ""}
                  </TravelerTitle>
                  <Grid>
                    <InfoItem>
                      <Label>First Name</Label>
                      <Value>{traveler.firstName || "—"}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>Last Name</Label>
                      <Value>{traveler.lastName || "—"}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>Gender</Label>
                      <Value>
                        {traveler.gender ? formatStatus(traveler.gender) : "—"}
                      </Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>DOB</Label>
                      <Value>{formatDate(traveler.dob)}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>Nationality</Label>
                      <Value>{traveler.nationality || "—"}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>Phone Number</Label>
                      <Value>{traveler.phoneNumber || "—"}</Value>
                    </InfoItem>
                    <InfoItem>
                      <Label>Age at Booking</Label>
                      <Value>{traveler.ageAtBooking ?? "—"}</Value>
                    </InfoItem>
                  </Grid>

                  {/* Travel Documents Section for this traveler */}
                  <DocumentsSubTitle>Travel Documents</DocumentsSubTitle>
                  <p
                    style={{
                      float: "right",
                      marginRight: "1.5rem",
                      marginTop: "-3.3rem",
                    }}
                  >
                    {" "}
                    {booking.documentVerificationStatus === "verified" ? (
                      <StatusBadge style={{ backgroundColor: "#10b981" }}>
                        Verified
                      </StatusBadge>
                    ) : booking.documentVerificationStatus === "rejected" ? (
                      <StatusBadge style={{ backgroundColor: "#eb1010" }}>
                        Rejected Verification | Please Reupload File(s)
                      </StatusBadge>
                    ) : (
                      <StatusBadge style={{ backgroundColor: "#f59e0b" }}>
                        Pending Verification
                      </StatusBadge>
                    )}
                  </p>

                  <DocumentGrid>
                    {documents.map((doc) => {
                      const docObj = docs[doc.key] || {};
                      const fileObj = docObj.file || {};
                      const previewUrl = doc.preview || fileObj.secureUrl || null;

                      let fileStatus = fileObj.status || docObj.verificationStatus;
                      if (!fileStatus) {
                        fileStatus = previewUrl ? "pending" : "not_uploaded";
                      }

                      const rejectionReason = fileObj.reason || docObj.reason || "";

                      return (
                        <DocumentCard key={doc.key}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <DocumentTitle style={{ margin: 0 }}>{doc.title}</DocumentTitle>
                            {fileStatus === "verified" && (
                              <StatusBadge style={{ backgroundColor: "#10b981", fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>Verified</StatusBadge>
                            )}
                            {fileStatus === "rejected" && (
                              <StatusBadge style={{ backgroundColor: "#eb1010", fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>Rejected</StatusBadge>
                            )}
                            {fileStatus === "pending" && (
                              <StatusBadge style={{ backgroundColor: "#f59e0b", fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>Under Review</StatusBadge>
                            )}
                            {fileStatus === "not_uploaded" && (
                              <StatusBadge style={{ backgroundColor: "#6b7280", fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>Not Uploaded</StatusBadge>
                            )}
                          </div>

                          <DocPreviewImage src={previewUrl} alt={doc.title} />

                          {doc.details.map((detail) => (
                            <DocumentDetailRow key={detail.label}>
                              <DocumentDetailLabel>
                                {detail.label}
                              </DocumentDetailLabel>

                              <DocumentDetailValue>
                                {detail.value}
                              </DocumentDetailValue>
                            </DocumentDetailRow>
                          ))}

                          {fileStatus === "rejected" && (
                            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.75rem", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
                              <strong>Reason:</strong> {rejectionReason || "Document rejected by verification team."}
                            </div>
                          )}

                          <input
                            id={`file-${idx}-${doc.key}`}
                            type="file"
                            hidden
                            onChange={(e) => handleFileChange(e, idx, doc)}
                          />

                          {fileStatus === "rejected" && (
                            <ReuploadButton
                              type="button"
                              disabled={isReuploading}
                              onClick={() =>
                                document.getElementById(`file-${idx}-${doc.key}`)?.click()
                              }
                            >
                              {isReuploading ? "Reuploading..." : "Reupload Document"}
                            </ReuploadButton>
                          )}

                          {fileStatus === "not_uploaded" && (
                            <ReuploadButton
                              type="button"
                              disabled={isReuploading}
                              style={{ backgroundColor: "#2563eb" }}
                              onClick={() =>
                                document.getElementById(`file-${idx}-${doc.key}`)?.click()
                              }
                            >
                              {isReuploading ? "Uploading..." : "Upload Document"}
                            </ReuploadButton>
                          )}

                          {fileStatus === "pending" && (
                              <ButtonGroup>
                                {previewUrl ? (
                                  <>
                                    <ActionButton
                                      href={previewUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Eye size={14} />
                                      View
                                    </ActionButton>

                                    <ActionButton
                                      href={previewUrl}
                                      download
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Download size={14} />
                                      Download
                                    </ActionButton>
                                  </>
                                ) : (
                                  <ActionButton
                                    as="button"
                                    disabled
                                    style={{
                                      opacity: 0.5,
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    Unavailable
                                  </ActionButton>
                                )}
                              </ButtonGroup>
                          )}

                          {fileStatus === "verified" && (
                            <ButtonGroup>
                              {previewUrl ? (
                                <>
                                  <ActionButton
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Eye size={14} />
                                    View
                                  </ActionButton>

                                  <ActionButton
                                    href={previewUrl}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Download size={14} />
                                    Download
                                  </ActionButton>
                                </>
                              ) : (
                                <ActionButton
                                  as="button"
                                  disabled
                                  style={{
                                    opacity: 0.5,
                                    cursor: "not-allowed",
                                  }}
                                >
                                  Unavailable
                                </ActionButton>
                              )}
                            </ButtonGroup>
                          )}
                        </DocumentCard>
                      );
                    })}
                  </DocumentGrid>
                </TravelerCard>
              );
            })
          )}
        </Section>

        {/* 5. Payment Information */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <CreditCard size={20} />
              Payment Information
            </SectionTitle>
            <SectionSubtitle>
              Transaction details and current settlement status
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            <InfoItem>
              <Label>Payment Provider</Label>
              <Value>
                {payment?.provider ? formatStatus(payment?.provider) : "—"}
              </Value>
            </InfoItem>
            <InfoItem>
              <Label>Payment Status</Label>
              <StatusBadge>{formatStatus(payment?.status)}</StatusBadge>
            </InfoItem>
            <InfoItem>
              <Label>Paid At</Label>
              <Value>{formatDate(payment.paidAt)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Order ID</Label>
              <Value>{payment?.orderId || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Payment ID</Label>
              <Value>{payment?.paymentId || "—"}</Value>
            </InfoItem>
          </Grid>
        </Section>

        {/* 6. Pricing Information */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <DollarSign size={20} />
              Pricing Information
            </SectionTitle>
            <SectionSubtitle>
              Comprehensive financial breakdown of charges and remaining dues
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            <InfoItem>
              <Label>Price Per Person</Label>
              <Value>{formatCurrency(pricePerPerson)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Total Amount</Label>
              <Value>{formatCurrency(totalAmount)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Amount Paid</Label>
              <Value>{formatCurrency(amountPaid)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Remaining Amount</Label>
              <Value>{formatCurrency(remainingAmount)}</Value>
            </InfoItem>
          </Grid>
        </Section>

        {/* 7. Emergency Contact */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <PhoneCall size={20} />
              Emergency Contact
            </SectionTitle>
            <SectionSubtitle>
              Primary contact designated for emergency notifications
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            <InfoItem>
              <Label>Name</Label>
              <Value>{emergencyContact?.name || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Relation</Label>
              <Value>
                {emergencyContact?.relation
                  ? formatStatus(emergencyContact?.relation)
                  : "—"}
              </Value>
            </InfoItem>
            <InfoItem>
              <Label>Phone Number</Label>
              <Value>{emergencyContact?.phoneNumber || "—"}</Value>
            </InfoItem>
          </Grid>
        </Section>

        {/* 8. Booking Information */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <Bookmark size={20} />
              Booking Information
            </SectionTitle>
            <SectionSubtitle>
              System identifiers and lifecycle timestamps
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            <InfoItem>
              <Label>Booking Number</Label>
              <Value>{bookingNumber || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Booking Status</Label>
              <StatusBadge>{formatStatus(bookingStatus)}</StatusBadge>
            </InfoItem>
            <InfoItem>
              <Label>Booking Created</Label>
              <Value>{formatDate(createdAt)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Updated At</Label>
              <Value>{formatDate(updatedAt)}</Value>
            </InfoItem>
          </Grid>
        </Section>

        {/* 9. Accepted Policies */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <ShieldCheck size={20} />
              Accepted Policies
            </SectionTitle>
            <SectionSubtitle>
              Verified legal terms and compliance agreements accepted by
              traveler
            </SectionSubtitle>
          </SectionHeader>

          <ChecklistGrid>
            {policyItems.map((policy) => (
              <ChecklistItem key={policy.key}>
                <CheckIcon>✓</CheckIcon>
                <span>{policy?.label}</span>
              </ChecklistItem>
            ))}
          </ChecklistGrid>

          <Grid>
            <InfoItem>
              <Label>Accepted Version</Label>
              <Value>{termsMap?.acceptedVersion || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Accepted Date</Label>
              <Value>{formatDate(termsMap?.acceptedAt)}</Value>
            </InfoItem>
          </Grid>
        </Section>

        {/* 10. Other Information */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <Info size={20} />
              Other Information
            </SectionTitle>
            <SectionSubtitle>
              System database reference IDs and route slugs
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            <InfoItem>
              <Label>Booking ID</Label>
              <Value>{_id || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>User ID</Label>
              <Value>{user || "—"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Tour Slug</Label>
              <Value>{tour?.slug || "—"}</Value>
            </InfoItem>
          </Grid>
        </Section>
      </Page>
    </>
  );
}


export default MyBookingDetails;
