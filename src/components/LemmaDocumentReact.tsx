/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { IconChevronDown, IconChevronUp, IconStar, IconTag } from "@tabler/icons-react";
import { generateClient } from "aws-amplify/api";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link, NavigateFunction } from "react-router";
import { Col, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import { Schema } from "../../amplify/data/resource";
import { STERBOEKEN_SECONDARY } from "../App";
import arrow from '../assets/arrow.png';
import { TagEntity, VoorlezenEntityResponse } from "../gql/graphql";
import { LemmaQueryLemma } from "../queries";
import { getOptimizedPhotoUrlFromPhotoEntry } from "../utils";
import { FullPageSpinner } from "./FullPageSpinner";

const client = generateClient<Schema>();

const IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME = 'ignore-open-in-new-page'

export const LemmaDocumentReact = (props: {
  lemma: LemmaQueryLemma | undefined,
  voorlezen: VoorlezenEntityResponse[ 'data' ],
  navigate: NavigateFunction
}) => {

  // change all <a> links in fetched lemma to have target = '_blank'
  useEffect(() => {
    if (!props.lemma) return;

    const targetDivs = document.getElementsByClassName('lemma-section-container');
    for (const element of targetDivs) {
      const links = element.querySelectorAll('a');
      for (const link of links) {
        if (link.className.includes(IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME)) return; // do not change target if we say not to
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    }
  }, [ props.lemma ])

  // handle PDF download
  const [ isDownloading, setIsDownloading ] = useState(false);

  const handlePDFDownload = async () => {
    setIsDownloading(true);
    try {
      // 1. Load the heavy PDF library ONLY when clicked
      const { pdf } = await import('@react-pdf/renderer');

      const { LemmaDocument } = await import('./LemmaDocument')

      // 3. Generate the blob
      const blob = await pdf(
        <LemmaDocument lemma={props.lemma} voorlezen={props.voorlezen} />
      ).toBlob();

      // 4. Force the browser to download it
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Sterboeken_${props.lemma?.attributes?.titel}_${props.lemma?.attributes?.jaar}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 5. Track on Plausible
      (window as any).plausible('PDF', { props: { 'PDF': props.lemma?.attributes?.titel } })
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // null check
  if (!props.lemma || !props.voorlezen) return null;

  // transform data
  const { attributes } = props.lemma;
  const { attributes: voorlezen } = props.voorlezen

  return (
    <div className="lemma-container">
      {isDownloading && <FullPageSpinner />}
      <Row className="align-items-center lemma-section-container">
        <Col xs={12} lg={8} className="mb-0">
          <div className="only-show-in-pdf pdf-header">
            <h3>STERBOEKEN</h3>
            <div>sterboeken.org</div>
          </div>
          <hr className="only-show-in-pdf my-3" />
          <div className="d-flex gap-2">
            <IconStar className="align-self-start" color={STERBOEKEN_SECONDARY} />
            <div>
              <h3 className="d-inline">{attributes?.titel} ({attributes?.jaar})</h3>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <IconStar className="align-self-start" color='transparent' />
            <div className="text-secondary text-nowrap">
              <div className="fs-6">{attributes?.auteur_voornaam} {attributes?.auter_achternaam}</div>
              {attributes?.auteur_2_voornaam && (
                <div className="fs-6">{attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam}</div>
              )}
              {attributes?.vertaald_door_voornaam && (
                <div className="fw-lightest">
                  <em>
                    Vertaald door {attributes.vertaald_door_voornaam} {attributes.vertaald_door_achternaam}
                  </em>
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Only show on Mobile + PDF */}
        <Col xs={12} lg={4} className="d-block d-lg-none pt-4 py-lg-0">
          <div className="d-flex justify-content-center">
            <div className="image-wrapper lemma-header">
              <img
                className="hide-in-pdf ignore-default-lemma-section-container-format"
                src={getOptimizedPhotoUrlFromPhotoEntry(attributes?.afbeelding?.data?.attributes)}
              />
            </div>
          </div>
        </Col>
        <Col xs={12} lg={4} className="mb-0">
          <div className="hide-in-pdf">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div className="align-self-start text-nowrap hide-in-pdf" style={{ fontSize: '11px' }}>
                <div>Dit boek lenen?</div>
                <div className="d-flex justify-content-end hide-in-pdf" style={{ transform: 'rotateX(180deg)' }}>
                  <img src={arrow} width={42} height={42} className="hide-in-pdf ignore-default-lemma-section-container-format" />
                </div>
              </div>
              <a
                className="text-nowrap mt-2 align-self-end pretty-button library-orange hide-in-pdf"
                href={attributes?.link_naar_jeugdbibliotheek ?? "https://www.jeugdbibliotheek.nl/"}
                target="_blank"
              >
                Naar de Jeugdbibliotheek
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="lemma-section-container mt-3">
        <Col xs={12} lg={8}>
          <section>
            <div className="d-flex justify-content-between">
              <div>
                <h5>In het kort</h5>
              </div>
              <div>
                <div className=" hide-in-pdf">
                  <span
                    className="pretty-button text-nowrap"
                    onClick={handlePDFDownload}
                  >
                    Download PDF
                  </span>
                </div>
              </div>
            </div>
            {attributes?.de_kern && (
              <BlocksRenderer content={attributes?.de_kern} />
            )}
            <div className="mt-3 gap-3 d-flex justify-content-start align-items-center">
              <a className={`hide-in-pdf pretty-button text-nowrap ${IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME}`} href="#het-verhaal">
                Het verhaal
              </a>
              <a className={`hide-in-pdf pretty-button text-nowrap ${IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME}`} href="#analyse">
                Analyse en interpretatie
              </a>
              <a className={`hide-in-pdf pretty-button text-nowrap ${IGNORE_OPEN_IN_NEW_PAGE_CLASSNAME}`} href="#didactische">
                Didactische vragen en lessuggesties
              </a>
            </div>
          </section>
        </Col>
        {/* Only show on Desktop */}
        <Col xs={12} lg={4} className="d-none d-lg-block">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="image-wrapper lemma-header">
              <img
                className="hide-in-pdf ignore-default-lemma-section-container-format"
                src={getOptimizedPhotoUrlFromPhotoEntry(attributes?.afbeelding?.data?.attributes)}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} lg={8}>
          {attributes?.doelgroep && (
            <section className="lemma-section-container">
              <h5>Doelgroep</h5>
              <BlocksRenderer content={attributes?.doelgroep} />
            </section>
          )}
          {attributes?.motieven && (
            <section className="lemma-section-container">
              <h5>Motieven</h5>
              <BlocksRenderer content={attributes?.motieven} />
            </section>
          )}
          {attributes?.het_verhaal && (
            <section id="het-verhaal" className="lemma-section-container">
              <h5>Het verhaal</h5>
              <BlocksRenderer content={attributes?.het_verhaal} />
            </section>
          )}
          {attributes?.analyse && (
            <section id="analyse" className="lemma-section-container">
              <h5>Analyse en interpretatie</h5>
              <BlocksRenderer content={attributes?.analyse} />
            </section>
          )}
        </Col>
        {/* Only show in Desktop */}
        <Col xs={12} lg={4} className="hide-in-pdf d-none d-lg-block">
          {(attributes?.tags?.data?.length ?? 0) > 0 && (
            <section className="lemma-section-container green">
              <h5>Tags</h5>
              {attributes?.tags?.data.map(t => (
                <TagLink t={t} navigate={props.navigate} />
              ))}
            </section>
          )}

          {((attributes?.opstaptitels?.data?.length ?? 0) > 0 || attributes?.opstaptitels_extern) && (
            <section className="lemma-section-container green">
              <h5>⁠Opstaptitels</h5>
              {attributes?.opstaptitels?.data.map(l => (
                <LemmaInternalLink l={l} navigate={props.navigate} type="Opstaptitels" />
              ))}
              {attributes?.opstaptitels_extern && (
                <BlocksRenderer content={attributes?.opstaptitels_extern} />
              )}
            </section>
          )}
          {((attributes?.parallel_lezens?.data?.length ?? 0) > 0 || attributes?.parallel_lezen_extern) && (
            <section className="lemma-section-container green">
              <h5>Parallel lezen</h5>
              {attributes?.parallel_lezens?.data.map(l => (
                <LemmaInternalLink l={l} navigate={props.navigate} type="ParallelLezen" />
              ))}
              {attributes?.parallel_lezen_extern && (
                <BlocksRenderer content={attributes?.parallel_lezen_extern} />
              )}
            </section>
          )}
          {((attributes?.verder_lezens?.data?.length ?? 0) > 0 || attributes?.verder_lezen_extern) && (
            <section className="lemma-section-container green">
              <h5>Verder lezen</h5>
              {attributes?.verder_lezens?.data.map(l => (
                <LemmaInternalLink l={l} navigate={props.navigate} type="VerderLezen" />
              ))}
              {attributes?.verder_lezen_extern && (
                <BlocksRenderer content={attributes?.verder_lezen_extern} />
              )}
            </section>
          )}
          <LemmaFeedbackForm lemma={props.lemma} />
        </Col>
      </Row>
      <Row className="mt-0">
        <Col xs={12} lg={8}>
          {/* Only show in Mobile + PDF */}
          <div className="d-block d-lg-none">
            {voorlezen && (
              <section className="lemma-section-container green">
                <h5>Voorlezen</h5>
                <BlocksRenderer content={voorlezen?.tekst} />
              </section>
            )}
          </div>
          {attributes?.lessuggesties && (
            <section id="didactische" className="lemma-section-container">
              <h5>Didactische vragen en lessuggesties</h5>
              <BlocksRenderer content={attributes?.lessuggesties} />
            </section>
          )}
          {attributes?.kerndoelen && (
            <section className="lemma-section-container gray">
              <h5>Kerndoelen Nederlands</h5>
              <BlocksRenderer content={attributes?.kerndoelen} />
            </section>
          )}
          {/* Only show in Mobile + PDF */}
          <div className="d-block d-lg-none">
            {(attributes?.tags?.data?.length ?? 0) > 0 && (
              <section className="lemma-section-container green">
                <h5>Tags</h5>
                {attributes?.tags?.data.map(t => (
                  <TagLink t={t} navigate={props.navigate} />
                ))}
              </section>
            )}
            {((attributes?.opstaptitels?.data?.length ?? 0) > 0 || attributes?.opstaptitels_extern) && (
              <section className="lemma-section green-container">
                <h5>⁠Opstaptitels</h5>
                {attributes?.opstaptitels?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} type="Opstaptitels" />
                ))}
                {attributes?.opstaptitels_extern && (
                  <BlocksRenderer content={attributes?.opstaptitels_extern} />
                )}
              </section>
            )}
            {((attributes?.parallel_lezens?.data?.length ?? 0) > 0 || attributes?.parallel_lezen_extern) && (
              <section className="lemma-section-container green">
                <h5>Parallel lezen</h5>
                {attributes?.parallel_lezens?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} type="ParallelLezen" />
                ))}
                {attributes?.parallel_lezen_extern && (
                  <BlocksRenderer content={attributes?.parallel_lezen_extern} />
                )}
              </section>
            )}
            {((attributes?.verder_lezens?.data?.length ?? 0) > 0 || attributes?.verder_lezen_extern) && (
              <section className="lemma-section-container green">
                <h5>Verder lezen</h5>
                {attributes?.verder_lezens?.data.map(l => (
                  <LemmaInternalLink l={l} navigate={props.navigate} type="VerderLezen" />
                ))}
                {attributes?.verder_lezen_extern && (
                  <BlocksRenderer content={attributes?.verder_lezen_extern} />
                )}
              </section>
            )}
            <LemmaFeedbackForm lemma={props.lemma} />
          </div>
          {attributes?.bronnen && (
            <section className="lemma-section-container gray">
              <h5>Vindplaatsen en bronnen</h5>
              {attributes?.bronnen && (
                <BlocksRenderer content={attributes?.bronnen} />
              )}
            </section>
          )}
        </Col>
        {/* Only show in Desktop */}
        <Col xs={12} lg={4} className="hide-in-pdf d-none d-lg-block">
          {voorlezen && (
            <section className="lemma-section-container green">
              <h5>Voorlezen</h5>
              <BlocksRenderer content={voorlezen?.tekst} />
            </section>
          )}
        </Col>
      </Row>
    </div >
  )
}

const LemmaInternalLink = (props: {
  l: LemmaQueryLemma,
  navigate: NavigateFunction,
  type: 'Opstaptitels' | 'ParallelLezen' | 'VerderLezen'
}) => {
  if (!props.l) return;
  const { id, attributes } = props.l;

  const onClick = () => {
    // keep track that an internal link was clicked
    (window as any).plausible('DoorverwijzingAndereTitel', { props: { 'DoorverwijzingAndereTitel': props.type } })

    // navigate to lemma
    props.navigate(`/teksten/${id}`)
  }

  return (
    <div className={"lemma-internal-link d-flex gap-3 my-3"} onClick={onClick}>
      <div>
        <div className="image-wrapper xs fixed">
          <img
            className="hide-in-pdf ignore-default-lemma-section-container-format"
            src={getOptimizedPhotoUrlFromPhotoEntry(attributes?.afbeelding?.data?.attributes, 'thumbnail')}
          />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center gap-1">
        <div className="text-secondary">{attributes?.auteur_voornaam} {attributes?.auter_achternaam} </div>
        {attributes?.auteur_2_voornaam && (
          <div className="text-secondary">{attributes?.auteur_2_voornaam} {attributes?.auter_2_achternaam} </div>
        )}
        <div>
          {attributes?.titel}
        </div>
      </div>
    </div>
  )
}

const TagLink = (props: {
  t: Partial<TagEntity>,
  navigate: NavigateFunction
}) => {
  if (!props.t) return;
  const { id, attributes } = props.t;

  return (
    <div className="lemma-internal-link w-100 d-flex align-items-center gap-3 my-2" onClick={() => props.navigate(`/tag/${id}`)}>
      <div>
        <IconTag />
      </div>
      <div>
        {attributes?.titel}
      </div>
    </div>
  )
}

const LemmaFeedbackForm = (props: {
  lemma: LemmaQueryLemma | undefined,
}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggleIsOpen = () => setIsOpen(p => !p);

  const [ isLoading, setIsLoading ] = useState(false);

  const [ auteur, setAuteur ] = useState('');
  const [ boek, setBoek ] = useState('');
  const [ waarom, setWaarom ] = useState('');
  const [ forOpstaptitels, setForOpstaptitels ] = useState(false);
  const [ forParallelLezen, setForParallelLezen ] = useState(false);
  const [ forVerderLezen, setForVerderLezen ] = useState(false);
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ occupation, setOccupation ] = useState('');

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const lemmaTitle = props.lemma?.attributes?.titel;

    setIsLoading(true)
    const response = await client.mutations.sendBookRecommendation({
      lemmaTitle,
      auteur,
      boek,
      waarom,
      forOpstaptitels,
      forParallelLezen,
      forVerderLezen,
      name,
      email,
      occupation
    });
    setIsLoading(false)

    if (!response.data?.id) {
      alert('Error sending book recommendation!');
      console.log(response)
      return;
    }

    alert('Book recommendation submitted!')
  }

  return (
    <section className="lemma-section-container green">
      <div className="d-flex align-items-center gap-2" onClick={toggleIsOpen}>
        <h5 className="clickable">
          Heb je een suggestie?
        </h5>
        {isOpen ? <IconChevronUp /> : <IconChevronDown />}
      </div>
      {isOpen && (
        <div>

          <div>
            <p className="fst-italic">
              Bekijk onze
              <Link to='/selectiecriteria'> selectiecriteria </Link>
              voor een geschikte titel.
            </p>
          </div>
          <div className="mt-3">
            <FormGroup>
              <Label for="formAuteur">Auteur</Label>
              <Input
                id="formAuteur"
                name="formAuteur"
                type="email"
                value={auteur}
                onChange={(e) => setAuteur(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="formBoek">Boektitel</Label>
              <Input
                id="formBoek"
                name="formBoek"
                type="text"
                value={boek}
                onChange={(e) => setBoek(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="formWaarom">Waarom raad je dit boek aan als passende titel bij dit boek?</Label>
              <Input
                id="formWaarom"
                name="formWaarom"
                type="textarea"
                value={waarom}
                onChange={(e) => setWaarom(e.target.value)}
                style={{ height: '200px' }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="formForOpstaptitels"
                name="formForOpstaptitels"
                type="checkbox"
                className="me-3"
                checked={forOpstaptitels}
                onChange={(e) => setForOpstaptitels(e.target.checked)}
              />
              <Label for="formForOpstaptitels">Opstaptitel</Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="formForParallelLezen"
                name="formForParallelLezen"
                type="checkbox"
                className="me-3"
                checked={forParallelLezen}
                onChange={(e) => setForParallelLezen(e.target.checked)}
              />
              <Label for="formForParallelLezen">Parallel lezen</Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="formForVerderLezen"
                name="formForVerderLezen"
                type="checkbox"
                className="me-3"
                checked={forVerderLezen}
                onChange={(e) => setForVerderLezen(e.target.checked)}
              />
              <Label for="formForVerderLezen">Verder lezen</Label>
            </FormGroup>
            <FormGroup className="mt-5">
              <Label className="fst-italic" for="formName">Naam (optioneel)</Label>
              <Input
                id="formName"
                name="formName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label className="fst-italic" for="formEmail">Email (optioneel)</Label>
              <Input
                id="formEmail"
                name="formEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label className="fst-italic" for="formOccupation">Functie (optioneel)</Label>
              <Input
                id="formOccupation"
                name="formOccupation"
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </FormGroup>
            {isLoading
              ? (
                <div className="d-flex w-100 justify-content-center">
                  <Spinner />
                </div>
              )
              : (
                <FormGroup className="mt-5">
                  <button
                    id="formSubmit"
                    name="formSubmit"
                    className="pretty-button"
                    onClick={handleSubmit}
                  >
                    Verzenden
                  </button>
                </FormGroup>
              )
            }
          </div>
        </div>
      )}
    </section>
  )
}