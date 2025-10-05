import { useQuery } from "@apollo/client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Card, CardBody, Col, Row } from "reactstrap";
import { COLOFON } from "../queries";

export const Colofon = () => {
  const { data } = useQuery(COLOFON);

  if (!data?.colofon?.data?.attributes) return null;
  const { tekst } = data.colofon.data.attributes;

  return (
    <>
      <Row>
        <Col xs={12}>
          <h4 className="mb-3">Colofon</h4>
          <Card>
            <CardBody>
              {tekst && (
                <BlocksRenderer content={tekst} />
              )}
            </CardBody>
          </Card>
        </Col>
        {/* <Col xs={4}>
          <div className="image-wrapper xl">
            <img src={foto?.data?.attributes?.url} />
          </div>
        </Col> */}
      </Row>
    </>
  )
}