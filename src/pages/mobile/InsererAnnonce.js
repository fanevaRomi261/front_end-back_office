import React, { useEffect, useState } from "react";
import api from "services/api";
import { 
  Container,
  FormGroup,
  Input,
  Row,
  Card,
  CardBody,
  Label,
  Button
} from "reactstrap";
import Header from "components/Headers/Header";

const InsererAnnonce = () => {
  const [marques, setMarques] = useState(null);
  const [categories, setCategories] = useState(null);
  const [types, setTypes] = useState(null);
  const [carburants, setCarburants] = useState(null);
  const [photos, setPhotos] = useState(null);

  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCarburant, setSelectedCarburant] = useState("");
  const [selectedPrix, setSelectedPrix] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const marqueResp = await api.get(`/marque`);
        setMarques(marqueResp.data.data);
        const categorieResp = await api.get(`/categorie`);
        setCategories(categorieResp.data.data);
        const typeResp = await api.get(`/type`);
        setTypes(typeResp.data.data);
        const carburantResp = await api.get(`/carburant/`);
        setCarburants(carburantResp.data.data);
      } catch (error) {
        console.error("Erreur", error);
      }
    };

    getData(); // Call the function immediately
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre les données au backend
    // alert(annonceData);
    
    const annonce = {
      marque:JSON.parse(selectedMarque),
      type:JSON.parse(selectedType),
      categorie:JSON.parse(selectedCategorie),
      carburant:JSON.parse(selectedCarburant),
      prix:Number(selectedPrix),
      description:selectedDescription,
      date:selectedDate,
      utilisateur:{
        id:1
      }
    };

    const annoncePost = {
      annonce:annonce,
      image:photos
    };

    // console.log(JSON.stringify(annoncePost));

    try {
      const response = await api.post('/user/annonce', annoncePost);
      console.log('Response:', response.data); // Assuming the response is in JSON format
      // You can update the state or take other actions based on the response
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error appropriately, you might want to update state or show an error message
    }

    // const response = api.post('/user/annonce',annoncePost);

    // console.log(response);
    
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const filesArray = [];
  
    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();
      const file = selectedFiles[i];
  
      reader.onload = (event) => {
        const base64String = event.target.result.split(",")[1];
  
        filesArray.push(base64String);
        if (filesArray.length === selectedFiles.length) {
          setPhotos(filesArray);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-3">
          <div className="mt-3 col-md-6">
            <Card className="bg-default shadow">
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label className="form-control-label text-white" for="idmarque">
                      Marque
                    </Label>
                    <Input
                      type="select"
                      id="idmarque"
                      name="idmarque"
                      value={selectedMarque}
                      onChange={(e) => setSelectedMarque(e.target.value)}
                    >
                      <option value="">Sélectionner</option>
                      {marques?.map((ctr, index) => (
                        <option key={index} value={JSON.stringify(ctr)}>
                          {ctr.libelle}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-control-label text-white" for="idcategorie">
                      Catégorie
                    </Label>
                    <Input
                      type="select"
                      id="idcategorie"
                      name="idcategorie"
                      value={selectedCategorie}
                      onChange={(e) => setSelectedCategorie(e.target.value)}
                    >
                      <option value="">Sélectionner</option>
                      {categories?.map((ctr, index) => (
                        <option key={index} value={JSON.stringify(ctr)}>
                          {ctr.libelle}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-control-label text-white" for="idtype">
                      Type
                    </Label>
                    <Input
                      type="select"
                      id="idtype"
                      name="idtype"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">Sélectionner</option>
                      {types?.map((ctr, index) => (
                        <option key={index} value={JSON.stringify(ctr)}>
                          {ctr.libelle}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-control-label text-white" for="idcarburant">
                      Carburant
                    </Label>
                    <Input
                      type="select"
                      id="idcarburant"
                      name="idcarburant"
                      value={selectedCarburant}
                      onChange={(e) => setSelectedCarburant(e.target.value)}
                    >
                      <option value="">Sélectionner</option>
                      {carburants?.map((ctr, index) => (
                        <option key={index} value={JSON.stringify(ctr)}>
                          {ctr.libelle}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-control-label text-white" for="prix">
                      Prix
                    </Label>
                    <Input
                      type="text"
                      id="prix"
                      name="prix"
                      value={selectedPrix}
                      onChange={(e) => setSelectedPrix(e.target.value)}
                    />
                    
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-control-label text-white" for="description">
                      Description
                    </Label>
                    <Input
                      type="textarea"
                      id="description"
                      name="description"
                      value={selectedDescription}
                      onChange={(e) => setSelectedDescription(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-control-label text-white" for="date">
                      Date
                    </Label>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-control-label text-white" for="photos">
                      Photos
                    </Label>
                    <Input
                      type="file"
                      id="photos"
                      name="photos"
                      multiple
                      onChange={handleFileChange}
                    />
                  </FormGroup>

                  <Button type="submit" color="primary">Valider</Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default InsererAnnonce;
