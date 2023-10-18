import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  useTheme,
  ButtonBase,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  Switch,
  Divider,
  InputAdornment,
  Card,
  SvgIcon,
  OutlinedInput,
} from "@mui/material";
import bg5 from "../assest/bg5.jpg";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { HiUserCircle, HiXCircle, HiMiniCheckCircle } from "react-icons/hi2";
import { BiBarChart } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTie,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import companyLogos from "../component/companylogo";
import defaultlogo from "../assest/avataricon/robot.png";
const InterviewDetail = () => {
  const { _id } = useParams();
  console.log(_id);
  const theme = useTheme();
  const [jobDetail, setjobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companylogo, setcompanylogo] = useState(defaultlogo);
  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:3001/get-interview/${_id}`)
        .then((response) => {
          setjobDetail(response.data);

          const logoName = response.data.company
            .toLowerCase()
            .replace(/\s/g, "");
          setcompanylogo(companyLogos[logoName]);
          setLoading(false);
        })
        .catch((e) => {
          console.log("error while Fetching Interview Detail");
          setLoading(false);
        });
    }
  }, [_id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formattedDate = formatDate(jobDetail.date);
  return (
    <Box>
      <Stack>
        <Stack
          py={"16vh"}
          px={"8vw"}
          sx={{
            justifyContent: "center",
            my: 2,
            // background: "linear-gradient(to right, #0f2027,#203a43,#2c5364)",
            p: 5,
            backgroundImage: `url(https://img.freepik.com/premium-vector/hr-process-concept-3d-isometric-design-man-choosing-online-resume-best-candidates-applicants-interview-human-resources-vector-isometry-illustration-with-people-scene-web-graphic_9209-10711.jpg)`,
            backgroundColor: "#06dbaf",
            borderRadius: "20px",
            backgroundSize: "contain",
            // backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            height: "50vh",
            backgroundImage: `linear-gradient(rgba(185,160,254,0.5),rgb(221,180,255,0.5)), url(https://img.freepik.com/premium-vector/hr-process-concept-3d-isometric-design-man-choosing-online-resume-best-candidates-applicants-interview-human-resources-vector-isometry-illustration-with-people-scene-web-graphic_9209-10711.jpg)`,
          }}
          spacing={2}
        >
          <Typography variant="h1">Interview Details</Typography>
        </Stack>

        <Grid2 container spacing={2} mt={2}>
          <Grid2 xs={12} lg={9}>
            <Stack
              sx={{
                borderRadius: "10px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                p: 4,
              }}
              spacing={2}
            >
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction="row" alignItems={"center"} spacing={1}>
                  {/* <img src={companylogo} height={"100px"} /> */}

                  <Typography variant="h3">
                    {jobDetail.company + " | " + jobDetail.role}
                  </Typography>
                </Stack>
                <Stack
                  color={jobDetail.offerstatus ? "green" : "red"}
                  direction={"row"}
                  spacing={0.5}
                  alignItems={"center"}
                >
                  <HiMiniCheckCircle />
                  <Typography variant="body1">
                    {jobDetail.offerstatus ? "Selected" : "Rejected"}
                  </Typography>
                </Stack>
              </Stack>

              <Typography variant="subtitle1">{`posted by  ${jobDetail.name} on ${formattedDate}`}</Typography>
              <Divider />
              {jobDetail.content.map((data) => {
                return <Typography variant="body2">{data}</Typography>;
              })}
            </Stack>
          </Grid2>
          <Grid2 xs={12} lg={3}>
            <Stack spacing={2}>
              <Card p={2} sx={{ height: "100px" }}>
                <img
                  src={companylogo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Card>
              <Card
                sx={{
                  p: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaMapMarkerAlt size={20} />
                  <Typography variant="subtitle1">
                    {jobDetail.location}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaUserTie size={20} />
                  <Typography variant="subtitle1">{jobDetail.role}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaBriefcase size={20} />
                  <Typography variant="subtitle1">
                    {jobDetail.jobtype}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaCalendarAlt size={20} />
                  <Typography variant="subtitle1">
                    {jobDetail.yearsofexperience === 0 ||
                    jobDetail.yearsofexperience === undefined
                      ? "Fresher"
                      : `${jobDetail.yearsofexperience} YOE`}
                  </Typography>
                </Stack>
              </Card>
            </Stack>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  );
};
export default InterviewDetail;
