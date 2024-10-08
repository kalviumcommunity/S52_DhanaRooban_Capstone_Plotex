import React, { useState } from "react";
import {
  Input,
  Button,
  Container,
  InputGroup,
  InputLeftElement,
  Image,
  AlertDialog,
  Box,
  Select,
  AlertDialogBody,
  FormControl,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Spinner,
  Text,
  FormLabel,
  Flex,
  VStack,
  Center,
  // toast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import BasicMap from "../components/BasicMap";
import locationIcon from "../assets/Images/SignPage/locationIcon.png";
import axios from "axios";
import { useGetIp } from "../components/location";
import BASE_URL from "../Config";
import Cookies from "js-cookie";

function FindSpace() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const [formValues, setFormValues] = useState({
    location: "",
    vehicleType: "",
    parkingSpaceType: "",
  });
  const token = Cookies.get("authToken");
  const [center, setCenter] = useState({ lat: 0, lon: 0 });
  
  const handleConsent = () => {
    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lon: longitude });
        setLoading(false);
        onClose();
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/profile/FindSpace/token`,
        formValues,
        {
          params: {
            token: token,
          },
        }
      );
      toast.success("Data submitted successfully!");
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name) => (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const cancelRef = React.useRef();


  return (
    <>
      <Navbar />
      {center.lat!== undefined && center.lon!== undefined && <BasicMap center={center} />}
      <Container
        overflowY="auto"
        p={4}
        border="2px solid black"
        margin="200"
        ml={{ base: "2", md: "30" }}
      >
        <Box>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <VStack spacing={4} align="stretch">
                <InputGroup>
                  <Input
                    borderColor="gray.300"
                    placeholder="Enter your address"
                    name="location"
                    value={formValues.location}
                    onChange={(e) => handleChange("location")(e.target.value)}
                  />
                  <InputLeftElement>
                    <Button onClick={onOpen} variant="ghost" size="sm">
                      <Image src={locationIcon} alt="Location Icon" />
                    </Button>
                  </InputLeftElement>
                </InputGroup>
                <Box>
                  <FormLabel>Vehicle Type</FormLabel>
                  <Select
                    placeholder="Select vehicle type"
                    name="vehicleType"
                    value={formValues.vehicleType}
                    onChange={(e) =>
                      handleChange("vehicleType")(e.target.value)
                    }
                  >
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle/Scooter</option>
                    <option value="truck">Truck/Van</option>
                    <option value="other">Others</option>
                  </Select>
                </Box>
                <Box>
                  <FormLabel>Parking Space Type</FormLabel>
                  <Select
                    placeholder="Select parking space type"
                    name="parkingSpaceType"
                    value={formValues.parkingSpaceType}
                    onChange={(e) =>
                      handleChange("parkingSpaceType")(e.target.value)
                    }
                  >
                    <option value="indoor">Indoor Parking</option>
                    <option value="outdoor">Outdoor Parking</option>
                    <option value="garage">Garage Parking</option>
                    <option value="carport">Carport Parking</option>
                    <option value="motorcycle">Motorcycle Parking</option>
                  </Select>
                </Box>
                <Button type="submit" mt={4}  w="full">
                  Submit
                </Button>
              </VStack>
            </FormControl>
          </form>
        </Box>
      </Container>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Consent to Collect Location</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            We would like to collect your location to enhance the service and
            provide a better user experience. This information will be used
            minimally and responsibly. Do you consent to this collection and use
            of your location?
            {loading && <Spinner size="sm" ml={3} />}
            {error && (
              <Text color="red.500" mt={2}>
                Error: {error}
              </Text>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="red" onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleConsent}
              ml={3}
              isDisabled={loading}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default FindSpace;
