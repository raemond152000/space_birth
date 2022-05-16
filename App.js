import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import React, { useEffect, useState } from "react";
import Physics from "./Physics";
import Images from "./Images";
import Constants from "./Constants";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(false);
  const [gameStart, setGameStart] = useState(true);
  const [gameLose, setGameLose] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  
  return (
    <View style={styles.container}>
      <Image
        source={Images.wall}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}               
        running={running}
        gameStart={gameStart}
        
        
        onEvent={(e) => {
          if (e.type === "gameOver") {
            setRunning(false);
            setGameLose(true)
            setGameStart(false)
            setWon(false)
            setScore(score)
          }
          if (e.type === "updateScore") {
            setScore(score + 1);
          }
          if (e.type === "gameWon") {
            setRunning(false);
            setGameLose(false)
            setGameStart(true);
            setWon(true);
            setScore(score)
          }
        }}
        style={styles.gameContainer}
      >
      
        <StatusBar style="auto" hidden={true} />
      </GameEngine>
     
      {gameStart && !running &&!won ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              padding: 15,
            }}
            onPress={() => {
              setScore(0);
              setRunning(true);
              setGameStart(true);
              gameEngine.swap(entities());
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
              CLICK TO START THE GAME
              REMEMBER: TAP TO KEEP SWIMMING
            </Text>
          </TouchableOpacity>
        </View>
      ) : null
      
      }
      {gameLose && !running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              padding: 15,
            }}
            onPress={() => {
              setScore(0);
              setRunning(true);
              setWon(false)
              
              gameEngine.swap(entities());
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
              GAME OVER: TRY HARDER TSK, RESTART GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      
      {!running && won ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              padding: 15,
            }}
            onPress={() => {
              setScore(0);
              setRunning(true);
              setWon(false);
              gameEngine.swap(entities());
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, justifyContent: "center", alignItems: "center"}}>
              CONGRATULATIONS YOU ARE NOW A FATHER! CLICK TO MAKE ANOTHER ONE!
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.controlsLeftRight}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-left" });
            }}
          >
            <View style={styles.controlRight}>
            <Image
            
            source={Images.left}
          />
            </View>
          </TouchableOpacity>
        </View>
     

        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-right" });
            }}
          >
            <View style={styles.controlLeft}>
            <Image
            
            source={Images.right}
          />
            </View>
          </TouchableOpacity>
        </View>



      </View>
      
      <Text
      style={{
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        justifyContent: "center",
        
        top: 20,
        backgroundColor: "white",
        padding: 10,
      }}
    >
     Score: {score}
    </Text>


    <Text style={styles.watermark}>Raemond Carta</Text>

  </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  watermark: {
    marginBottom: 30,
    color: "white"
  },
  controlsContainer: {
    flex: 0.3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controlsUpDown: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  controlsLeftRight: {
    flex: 0.025,
    flexDirection: "row",
    alignItems: "center",
    margin: 50,
    justifyContent: "space-between",
  },

  controlRow: {
    margin: 3,
    paddingHorizontal: 45,
  },

  controlUp: {
    width: 70,
    height: 70,
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    backgroundColor: "#8080ff",

  },
 /*  controlRight: {
    width: 70,
    height: 70,
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    backgroundColor: "#8080ff",
  },
  controlLeft: {
    width: 70,
    height: 70,
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    backgroundColor: "#8080ff",

  }, */
  controlDown: {
    width: 70,
    height: 70,
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    backgroundColor: "#8080ff",
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
  },

  mrk: {
    fontSize: 20,
    left: 30,
    bottom: 25,
    position: "absolute",
    color: "lightgreen",
  },
  msb: {
    fontSize: 20,
    right: 30,
    bottom: 25,
    position: "absolute",
    color: "lightblue",
  },
});
