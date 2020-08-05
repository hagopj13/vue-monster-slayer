new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      const damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({ 
        isPlayer: true, 
        text: `Player hits Monster by ${damage}`,
      });
      if(this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack() {
      const damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({ 
        isPlayer: true, 
        text: `Player hits Monster hard by ${damage}`,
      });
      if(this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({ 
        isPlayer: true, 
        text: 'Player heals itself by 10',
      });
      this.monsterAttacks();
    },
    giveUp() {
      this.isGameRunning = false;
      this.turns.unshift({ 
        isPlayer: true, 
        text: 'Player gave up',
      });
    },
    monsterAttacks() {
      const damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({ 
        isPlayer: false, 
        text: `Monster hits Player by ${damage}`,
      });
      this.checkWin();
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.isGameRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.isGameRunning = false;
        }
        return true;
      }
      return false;
    },
  },
})