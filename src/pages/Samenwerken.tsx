import { useQuery } from "@apollo/client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Card, CardBody, Col, Row } from "reactstrap";
import { SAMENWERKEN } from "../queries";

export const Samenwerken = () => {
  const { data } = useQuery(SAMENWERKEN);

  if (!data?.samenwerken?.data?.attributes) return null;
  console.log(data.samenwerken.data.attributes)
  const { Tekst } = data.samenwerken.data.attributes;

  return (
    <>
      <Row>
        <Col xs={12}>
          <h4 className="mb-3">Samenwerken</h4>
          <Card>
            <CardBody>
              {Tekst && (
                <BlocksRenderer content={Tekst} />
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