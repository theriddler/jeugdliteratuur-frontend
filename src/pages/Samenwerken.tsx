import { useQuery } from "@apollo/client";
import { FeeedbackForm } from "../components/FeedbackForm";
import { InfoPage } from "../components/InfoPage";
import { SAMENWERKEN } from "../queries";

export const Samenwerken = () => {
  const { data, loading } = useQuery(SAMENWERKEN);
  const samenwerken = data?.samenwerken?.data;

  return (
    <div>
      <InfoPage
        titel="Feedback"
        tekst={samenwerken?.attributes?.Tekst}
        fotoUrl={undefined}
        loading={loading}
        fotoReplacement={<FeeedbackForm />}
      />
    </div>
  )
}