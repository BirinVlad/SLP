var HeroType;
(function (HeroType) {
    HeroType["Warrior"] = "WARRIOR";
    HeroType["Mage"] = "MAGE";
    HeroType["Archer"] = "ARCHER";
})(HeroType || (HeroType = {}));
var AttackType;
(function (AttackType) {
    AttackType["Physical"] = "PHYSICAL";
    AttackType["Magical"] = "MAGICAL";
    AttackType["Ranged"] = "RANGED";
})(AttackType || (AttackType = {}));
function createHero(name, type) {
    var baseStats = {
        health: 100,
        attack: 10,
        defense: 5,
        speed: 5
    };
    switch (type) {
        case HeroType.Warrior:
            baseStats.attack += 5;
            baseStats.defense += 5;
            break;
        case HeroType.Mage:
            baseStats.attack += 7;
            baseStats.speed += 3;
            break;
        case HeroType.Archer:
            baseStats.attack += 4;
            baseStats.speed += 5;
            break;
    }
    return {
        id: Date.now(),
        name: name,
        type: type,
        attackType: type === HeroType.Mage ? AttackType.Magical : AttackType.Physical,
        stats: baseStats,
        isAlive: true
    };
}
function calculateDamage(attacker, defender) {
    var criticalHitChance = Math.random() < 0.2;
    var baseDamage = Math.max(0, attacker.stats.attack - defender.stats.defense);
    var damage = criticalHitChance ? baseDamage * 2 : baseDamage;
    var remainingHealth = Math.max(0, defender.stats.health - damage);
    return {
        damage: damage,
        isCritical: criticalHitChance,
        remainingHealth: remainingHealth
    };
}
function findHeroByProperty(heroes, property, value) {
    return heroes.filter(function (hero) { return hero[property] === value; })[0];
}
function battleRound(hero1, hero2) {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "Один з героїв не живий.";
    }
    var attackResult1 = calculateDamage(hero1, hero2);
    hero2.stats.health = attackResult1.remainingHealth;
    if (hero2.stats.health === 0) {
        hero2.isAlive = false;
    }
    var attackResult2 = calculateDamage(hero2, hero1);
    hero1.stats.health = attackResult2.remainingHealth;
    if (hero1.stats.health === 0) {
        hero1.isAlive = false;
    }
    return "".concat(hero1.name, " \u0430\u0442\u0430\u043A\u0443\u0454 ").concat(hero2.name, " \u0456 \u0437\u0430\u0432\u0434\u0430\u0454 ").concat(attackResult1.damage, " \u043F\u043E\u0448\u043A\u043E\u0434\u0436\u0435\u043D\u044C. ") +
        "".concat(hero2.name, " \u0437\u0430\u043B\u0438\u0448\u0438\u0432\u0441\u044F \u0437 ").concat(hero2.stats.health, " \u0437\u0434\u043E\u0440\u043E\u0432'\u044F.\n") +
        "".concat(hero2.name, " \u0430\u0442\u0430\u043A\u0443\u0454 ").concat(hero1.name, " \u0456 \u0437\u0430\u0432\u0434\u0430\u0454 ").concat(attackResult2.damage, " \u043F\u043E\u0448\u043A\u043E\u0434\u0436\u0435\u043D\u044C. ") +
        "".concat(hero1.name, " \u0437\u0430\u043B\u0438\u0448\u0438\u0432\u0441\u044F \u0437 ").concat(hero1.stats.health, " \u0437\u0434\u043E\u0440\u043E\u0432'\u044F.");
}
var heroes = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage),
    createHero("Леон", HeroType.Archer)
];
var warrior = heroes[0];
var mage = heroes[1];
var battleResult = battleRound(warrior, mage);
console.log(battleResult);
var hero = findHeroByProperty(heroes, "type", HeroType.Warrior);
console.log("\u0417\u043D\u0430\u0439\u0434\u0435\u043D\u0438\u0439 \u0433\u0435\u0440\u043E\u0439: ".concat(hero === null || hero === void 0 ? void 0 : hero.name));
