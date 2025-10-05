import { useQuery } from "@apollo/client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Card, CardBody, Col, Row } from "reactstrap";
import { GEBRUIK_VAN_DE_LIJST } from "../queries";

export const GebruikVanDeLijst = () => {
  const { data } = useQuery(GEBRUIK_VAN_DE_LIJST);

  if (!data?.gebruikVanDeLijst?.data?.attributes) return null;
  console.log(data.gebruikVanDeLijst.data.attributes)
  const { Tekst } = data.gebruikVanDeLijst.data.attributes;

  return (
    <>
      <Row>
        <Col xs={12}>
          <h4 className="mb-3">Gebruik van de lijst</h4>
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