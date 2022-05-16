//physics.js
import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants";
import { GameEngine } from "react-native-game-engine";
import React, { useEffect, useState } from "react";

const Physics = (entities, { touches, dispatch, events, time }) => {
  let engine = entities.physics.engine;
  let world = engine.world
  
  /* const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;


  }; */
  
  

  let x = entities.Player.body.position.x;
  let y = entities.Player.body.position.y;
  touches
    .filter((t) => t.type === "move")
    .forEach((t) => {
      x += t.delta.pageX;
      y += t.delta.pageY;
      Matter.Body.setPosition(entities.Player.body, {
        x: x,
        y: y,
      });
    });

    Matter.Events.on(engine, "collisionStart", (event) => {
      var pairs = event.pairs;
      
      var objA = pairs[0].bodyA;
      var objB = pairs[0].bodyB;
      var objALabel = pairs[0].bodyA.label;
      var objBLabel = pairs[0].bodyB.label;
    
    /*   if (!entities.Player.body.isSleeping) {
        setInterval(() => {
          dispatch({ type: "updateScore" });
        }, 5000);
        
      } */
      

      if (objALabel === "Player" && objBLabel === "Germ") {       
        dispatch({ type: "gameOver" });
        Sleeping.set(objA, true);
        
      }
      if (objALabel === "Player" && objBLabel === "Egg") {       
        dispatch({ type: "gameWon" });
      }
    });
   
  
    Matter.Body.setVelocity(entities.GermA.body, { x: 0, y: 2});
    Matter.Body.setVelocity(entities.GermB.body, { x:0, y:1 });
    Matter.Body.setVelocity(entities.GermC.body, { x:0, y:2 });
    /* Matter.Body.setVelocity(entities.GermD.body, { x:0, y:1 });
    Matter.Body.setVelocity(entities.GermE.body, { x:0, y:1 }); */
    Matter.Body.setVelocity(entities.GermF.body, { x:0, y:1 });
    Matter.Body.setVelocity(entities.GermG.body, { x:0, y:1.5 });
    Matter.Body.setVelocity(entities.GermH.body, { x:0, y:1 });
    Matter.Body.setVelocity(entities.GermI.body, { x:0, y:2 });
    Matter.Body.setVelocity(entities.GermJ.body, { x:0, y:1.5 });
    Matter.Body.setVelocity(entities.GermK.body, { x:0, y:2});
    Matter.Body.setVelocity(entities.GermL.body, { x:0, y:2});
    Matter.Body.setVelocity(entities.Egg.body, { x:0, y:2.5});
    
    if(entities.Player.body.position.y === Constants.WINDOW_HEIGHT){
      dispatch({ type: "gameOver" });
    }
    if(entities.GermB.body.position.y === 680){
      Matter.Body.setPosition(entities.GermB.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: 30});
    }
    if(entities.GermC.body.position.y === 680){
      Matter.Body.setPosition(entities.GermC.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -60});
    }
    /* if(entities.GermD.body.position.y === 680){
      Matter.Body.setPosition(entities.GermB.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -150});
    }
    if(entities.GermE.body.position.y === 680){
      Matter.Body.setPosition(entities.GermE.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -240});
    } */
    if(entities.GermF.body.position.y === 680){
      Matter.Body.setPosition(entities.GermF.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -330});
    }
    if(entities.GermG.body.position.y === 680){
      Matter.Body.setPosition(entities.GermF.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -330});
    }
    if(entities.GermH.body.position.y === 680){
      Matter.Body.setPosition(entities.GermH.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -420});
    }
    if(entities.GermI.body.position.y === 680){
      Matter.Body.setPosition(entities.GermI.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -510});
    }
    if(entities.GermJ.body.position.y === 680){
      Matter.Body.setPosition(entities.GermJ.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -600});
    }
    if(entities.GermK.body.position.y === 680){
      Matter.Body.setPosition(entities.GermK.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -650});
    }
    if(entities.GermL.body.position.y === 680){
      Matter.Body.setPosition(entities.GermL.body,{x: Math.floor((Math.random() * (Constants.WINDOW_WIDTH - 50 ) - 40)+40), y: -690});
    }

   
    /* if(entities.GermA.body.position.y === 300){
      Matter.Body.setVelocity(entities.GermD.body, { x:0, y:4 });
    }
    if(entities.GermA.body.position.y === 270){
      Matter.Body.setVelocity(entities.GermE.body, { x:0, y:4 });
    } */
    /* if (events.length) {
      //Sleeping.set(entities.RedSquare.body, false);
      for (let i = 0; i < events.length; i++) {
        
        if (events[i].type === "update-score") {
          
        }
       
      }
    } */

  /*************TOUCH CONTROLS WITH ARROW KEY ****************/
  if (events.length) {
    //Sleeping.set(entities.RedSquare.body, false);
    for (let i = 0; i < events.length; i++) {
      
      if (events[i].type === "move-right") {
        Matter.Body.setVelocity(entities.Player.body, { x: 5, y: 0 });
        dispatch({ type: "updateScore" });
      }
      if (events[i].type === "move-left") {
        Matter.Body.setVelocity(entities.Player.body, { x: -5, y: 0 });
        dispatch({ type: "updateScore" });
      }
      if (events[i].type === "update-score") {
        Matter.Body.setVelocity(entities.Player.body, { x: -5, y: 0 });
        dispatch({ type: "updateScore" });
      }
    }
  }
  /*************TOUCH CONTROLS WITH SCREEN TAP ****************/

  /*  touches
     .filter((t) => t.type === "press")
     .forEach((t) => {
       Matter.Body.setPosition(
         entities.Player.body,
         
         {
           x: Math.floor(Math.random() * ((Constants.WINDOW_WIDTH-40) - 40)+ 30),
           y: Constants.WINDOW_HEIGHT/4
         }
       );
 
           Sleeping.set(entities.Player.body, false);
     }); */

 
  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
