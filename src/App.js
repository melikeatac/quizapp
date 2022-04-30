import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: "transparent",
  padding: theme.spacing(1),
  paddingTop: 35,
  color: theme.palette.text.secondary,
}));

function App() {
  const [state, setState] = useState({
    value: 0,
    isFinished: false,
    joker: 2,
    score: 0,
    currentQuestionIndex: 0,
    questions: [
      {
        question: "React ın geliştiricisi kimdir?",
        answerId: 4,
        answer: [
          {
            id: 1,
            title: "Google",
          },
          {
            id: 2,
            title: "Amazon",
          },
          {
            id: 3,
            title: "Apple",
          },
          {
            id: 4,
            title: "Facebook",
          },
        ],
      },
      {
        question: "Hangisinde eş anlamlı kelimeler vardır?",
        answerId: 3,
        answer: [
          {
            id: 1,
            title: "kara-ak",
          },
          {
            id: 2,
            title: "siyah-beyaz",
          },
          {
            id: 3,
            title: "al-kırmızı",
          },
          {
            id: 4,
            title: "kuzey-güney",
          },
        ],
      },
      {
        question: "Mustafa Kemal Atatürk kaç yılında vefat etmiştir?",
        answerId: 4,
        answer: [
          {
            id: 1,
            title: "1881",
          },
          {
            id: 2,
            title: "1913",
          },
          {
            id: 3,
            title: "1936",
          },
          {
            id: 4,
            title: "1938",
          },
        ],
      },
      {
        question: "Dünyanın yüzölçümü en büyük ülkesi hangisidir?",
        answerId: 3,
        answer: [
          {
            id: 1,
            title: "Türkiye",
          },
          {
            id: 2,
            title: "Amerika",
          },
          {
            id: 3,
            title: "Çin",
          },
          {
            id: 4,
            title: "Rusya",
          },
        ],
      },
      {
        question: "Lozan anlaşmasının gizli maddesi hangisidir?",
        answerId: 4,
        answer: [
          {
            id: 1,
            title: "2023'e kadar bor kullanılamaz",
          },
          {
            id: 2,
            title: "Ekonomide şahlanma yasak",
          },
          {
            id: 3,
            title: "MEB ABD tarafından yönetilecek",
          },
          {
            id: 4,
            title: "Hiçbiri",
          },
        ],
      },
    ],
  });

  const { questions, joker, currentQuestionIndex, isFinished, value } = state;

  const currentQuestion = questions[currentQuestionIndex] || {};

  /*Radio butona basıldığındaki değeri*/
  const handleChange = (event) => {
    setState((s) => ({
      ...s,
      value: event.target.value,
    }));
  };

  const useJoker = () => nextQuestion(true);

  const nextQuestion = (isJoker) => {
    if (questions.length - 1 > currentQuestionIndex) {
      setState((s) => ({
        ...s,
        currentQuestionIndex: currentQuestionIndex + 1,
        score: isJoker
          ? s.score + 10
          : currentQuestion.answerId === parseInt(s.value)
          ? s.score + 10
          : s.score,
        value: 0,
        joker: isJoker ? s.joker - 1 : s.joker,
      }));
      console.log("VALUEE:", value);
    } else {
      setState((s) => ({
        ...s,
        currentQuestionIndex: currentQuestionIndex + 1,
        score: isJoker
          ? s.score + 10
          : currentQuestion.answerId === parseInt(s.value)
          ? s.score + 10
          : s.score,
        value: 0,
        isFinished: true,
        joker: isJoker ? s.joker - 1 : s.joker,
      }));
    }
  };

  const [load, setLoad] = useState(false);

  function reloadPage() {
    setLoad(
      true,
      setInterval(() => {
        window.location.reload();
      }, 4000)
    );
  }
  return (
    <Grid container justifyContent={"center"} alignItems={"flex-end"}>
      <Grid
        item
        sx={{
          minHeight: 100,
          borderRadius: 2,
          marginTop: 2,
          backgroundColor: state.isFinished
            ? state.score > 40
              ? "#0F9D58"
              : "#DB4437"
            : "#5993f0",
          alignItems: "flex-end",
        }}
        xs={8}
      >
        <Item elevation={0}>
          {isFinished ? (
            <Typography
              sx={{
                fontSize: "25px",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              Score: {state.score}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              {state.value !== 0
                ? "Bir Sonraki Soruya Geçebilirsiniz"
                : "Lütfen Bir Cevap Seçin"}
            </Typography>
          )}
        </Item>
      </Grid>
      {!isFinished && (
        <Grid
          xs={8}
          sx={{
            justifyContent: "center",
            textAlign: "center",
            padding: "50px 20px",
            backgroundColor: "gray",
            borderRadius: "10px",
            marginTop: "2px",
          }}
        >
          <FormControl
            sx={{
              margin: "auto",
            }}
          >
            <FormLabel
              id="demo-controlled-radio-buttons-group"
              sx={{
                fontSize: "25px",
                color: "#ffffff !important",
              }}
            >
              {`Soru ${currentQuestionIndex + 1}) ${currentQuestion.question}`}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              sx={{
                flexDirection: "row",
                margin: "30px 0px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(currentQuestion.answer || []).map((a) => (
                <FormControlLabel
                  value={a.id}
                  control={<Radio />}
                  label={a.title}
                  sx={{
                    display: "flex",
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Grid xs={12} justifyContent={"center"} alignItems={"center"}>
            <Button
              variant="contained"
              disabled={joker === 0}
              onClick={useJoker}
              style={{
                marginRight: 20,
              }}
            >
              Joker ({joker})
            </Button>
            <Button
              variant="contained"
              disabled={state.value === 0}
              onClick={() => nextQuestion(false)}
            >
              Cevapla
            </Button>
          </Grid>
        </Grid>
      )}
      <Grid xs={5}>
        <Button
          variant="contained"
          onClick={reloadPage}
          sx={{
            display: isFinished === false ? "none" : "block",
            width: "80%",
            backgroundColor: "#79B4B7",
            color: "#ffffff",
            marginTop: "20px",
            padding: "20px 0px",
            fontSize: "16px",
          }}
        >
          {load !== true ? "TEKRAR DENEYİNİZ" : "YÖNLENDİRİLİYORSUNUZ..."}
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;
