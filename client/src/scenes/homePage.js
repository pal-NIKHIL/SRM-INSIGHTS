import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Card,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import bg7 from "../assest/bg7.svg";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [totalReview, settotalreview] = useState(0);
  const [totalInterview, settotalInterview] = useState(0);
  useEffect(() => {
    try {
      axios.get("http://localhost:3001/totalCount").then((response) => {
        console.log(response.data);
        settotalreview(response.data.totalReview);
        settotalInterview(response.data.totalInterview);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <Box>
      <Grid2
        container
        py={"16vh"}
        px={"8vw"}
        m={1}
        sx={{
          backgroundImage: isLargeScreen ? `url(${bg7})` : "none",
          backgroundColor: "#93d5e1",
          borderRadius: "20px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
        spacing={2}
      >
        <Grid2 xs={12} spacing={2}>
          <Box>
            <Typography variant="h1">Discover Stories</Typography>
            <Typography variant="h1">and Perspectives</Typography>
          </Box>
        </Grid2>
        {!isLargeScreen && (
          <Grid2 xs={12}>
            <img src={bg7} />
          </Grid2>
        )}
        <Grid2 xs={12} md={4}>
          <Card>
            <Stack alignItems={"center"} p={2} spacing={2}>
              <BiHome size={30} />
              <Typography variant="h3">{totalReview}+</Typography>
              <Typography variant="subtitle1">Campus Experiences</Typography>
              <ButtonBase
                component={Link}
                to="/campus-experience"
                width="100%"
                sx={{
                  backgroundColor: "#161313",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
                p={1}
              >
                <Typography
                  color={theme.palette.secondary.main}
                  variant="subtitle1"
                  m={1}
                >
                  Explore Now
                </Typography>
              </ButtonBase>
            </Stack>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={4}>
          <Card>
            <Stack alignItems={"center"} p={2} spacing={2}>
              <BiHome size={30} />
              <Typography variant="h3">{totalInterview + "+"}</Typography>
              <Typography variant="subtitle1">
                Get Interview Insights
              </Typography>
              <ButtonBase
                component={Link}
                to="/campus-experience"
                width="100%"
                sx={{
                  backgroundColor: "#161313",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
                p={1}
              >
                <Typography
                  color={theme.palette.secondary.main}
                  variant="subtitle1"
                  m={1}
                >
                  Join Now
                </Typography>
              </ButtonBase>
            </Stack>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default HomePage;
