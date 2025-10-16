import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Link, useNavigate } from "react-router";
import { Card, CardBody } from "reactstrap";
import { LemmataQueryLemma } from "../queries";

export const LemmaOverview = (props: {
  lemma: LemmataQueryLemma
}) => {
  const navigate = useNavigate();

  if (!props.lemma) return null;
  const { id, attributes } = props.lemma;

  const imageUrl = attributes?.afbeelding?.data?.attributes?.url;

  return (
    <Card className="clickable h-100" onClick={() => navigate(`/lemma/${id}`)}>
      <CardBody>
        <div className="d-flex flex-column h-100">
          <div>
            <div>
              <div>
                <span className="fw-bold">{attributes?.titel}</span>
                <span className="ms-2">({attributes?.jaar})</span>
              </div>
              <div className="text-secondary">
                {attributes?.auteur_voornaam} {attributes?.auter_achternaam}
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <div className="image-wrapper lemma-overview">
                <img src={imageUrl} />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                {attributes?.korte_intro && (
                  <BlocksRenderer content={attributes?.korte_intro} />
                )}
              </div>
            </div>
          </div>
          <div className="flex-grow-1 d-flex align-items-end">
            <Link to={`/lemma/${id}`}>
              Verder lezen
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}