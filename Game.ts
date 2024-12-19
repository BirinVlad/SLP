
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}


enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}


interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}


interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}


type AttackResult = {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
}


function createHero(name: string, type: HeroType): Hero {
    const baseStats: HeroStats = {
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
        name,
        type,
        attackType: type === HeroType.Mage ? AttackType.Magical : AttackType.Physical,
        stats: baseStats,
        isAlive: true
    };
}


function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
    const criticalHitChance = Math.random() < 0.2; 
    const baseDamage = Math.max(0, attacker.stats.attack - defender.stats.defense);
    const damage = criticalHitChance ? baseDamage * 2 : baseDamage;

    const remainingHealth = Math.max(0, defender.stats.health - damage);
    
    return {
        damage,
        isCritical: criticalHitChance,
        remainingHealth
    };
}


function findHeroByProperty<T extends keyof Hero>(
    heroes: Hero[],
    property: T,
    value: Hero[T]
): Hero | undefined {
    return heroes.filter(hero => hero[property] === value)[0];
}


function battleRound(hero1: Hero, hero2: Hero): string {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "Один з героїв не живий.";
    }

    const attackResult1 = calculateDamage(hero1, hero2);
    hero2.stats.health = attackResult1.remainingHealth;
    if (hero2.stats.health === 0) {
        hero2.isAlive = false;
    }

    const attackResult2 = calculateDamage(hero2, hero1);
    hero1.stats.health = attackResult2.remainingHealth;
    if (hero1.stats.health === 0) {
        hero1.isAlive = false;
    }

    return `${hero1.name} атакує ${hero2.name} і завдає ${attackResult1.damage} пошкоджень. ` +
           `${hero2.name} залишився з ${hero2.stats.health} здоров'я.\n` +
           `${hero2.name} атакує ${hero1.name} і завдає ${attackResult2.damage} пошкоджень. ` +
           `${hero1.name} залишився з ${hero1.stats.health} здоров'я.`;
}


const heroes: Hero[] = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage),
    createHero("Леон", HeroType.Archer)
];


const warrior = heroes[0];
const mage = heroes[1];


const battleResult = battleRound(warrior, mage);
console.log(battleResult);

 
const hero = findHeroByProperty(heroes, "type", HeroType.Warrior);
console.log(`Знайдений герой: ${hero?.name}`);
