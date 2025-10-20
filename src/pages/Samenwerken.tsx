import { useQuery } from "@apollo/client";
import { InfoPage } from "../components/InfoPage";
import { SAMENWERKEN } from "../queries";
import { FeeedbackForm } from "../components/FeedbackForm";
import { Col, Row } from "reactstrap";

export const Samenwerken = () => {
  const { data, loading } = useQuery(SAMENWERKEN);
  const samenwerken = data?.samenwerken?.data;

  return (
    <div>
      <InfoPage
        titel="Feedback"
        tekst={samenwerken?.attributes?.Tekst}
        fotoUrl={samenwerken?.attributes?.foto?.data?.attributes?.url}
        loading={loading}
      />
      {!loading && (
        <Row className='mt-3 justify-content-center'>
          <Col xs={12} lg={8}>
            <FeeedbackForm />
          </Col>
        </Row>
      )}
    </div>
  )
}