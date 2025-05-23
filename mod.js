const playerclassFileName = 'global\\excel\\playerclass.txt';
const playerclass = D2RMM.readTsv(playerclassFileName);

const plrTypeFileName = 'global\\excel\\plrtype.txt';
const plrType = D2RMM.readTsv(plrTypeFileName);

const cubemainFileName = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFileName);

const skillsFileName = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFileName);

const skilldescFilename = 'global\\excel\\skilldesc.txt';
const skilldesc = D2RMM.readTsv(skilldescFilename);

const skillsJsonFilename = 'local\\lng\\strings\\skills.json';
const skillsJson = D2RMM.readJson(skillsJsonFilename);

const magicprefixFileName = 'global\\excel\\magicprefix.txt';
const magicprefix = D2RMM.readTsv(magicprefixFileName);

const magicsuffixFileName = 'global\\excel\\magicsuffix.txt';
const magicsuffix = D2RMM.readTsv(magicsuffixFileName);

// Token of absolution recipe
cubemain.rows.push(
    {
        'description': 'Token of Absolution Custom Recipe',
        'enabled': 1,
        'version': 100,
        'op': '',
        'param': '',
        'value': '',
        'numinputs': 2,
        'input 1': 'tsc',
        'input 2': 'isc',
        'output': 'toa',
        '*eol': 0
    }
);

const warcrySkills = [
    'Howl',
    'Find Potion',
    'Taunt',
    'Shout',
    'Find Item',
    'Battle Cry',
    'Battle Orders',
    'Grim Ward',
    'War Cry',
    'Battle Command'
];

const warcryiconcell = [
    8,
    10,
    22,
    24,
    32,
    40,
    46,
    48,
    56,
    58
]

const offensiveSkills = [
    'Might',
    'Holy Fire',
    'Thorns',
    'Blessed Aim',
    'Concentration',
    'Holy Freeze',
    'Holy Shock',
    'Sanctuary',
    'Fanaticism',
    'Conviction'
]

const offensiveiconcell = [
    4,
    12,
    14,
    24,
    34,
    36,
    44,
    46,
    52,
    56
]

warcrySkills.forEach((skill, index) => {
    const skillRow = skills.rows.find(row => row['skill'] === skill);
    if (skillRow) {
        skillRow['charclass'] = 'pal';
        const skillDeskRow = skilldesc.rows.find(row => row['skilldesc'] === skillRow['skilldesc']);
        if (skillDeskRow) {
            skillDeskRow['SkillPage'] = 2;
            skillDeskRow['IconCel'] = offensiveiconcell[index];
        }
    }
});

offensiveSkills.forEach((skill, index) => {
    const skillRow = skills.rows.find(row => row['skill'] === skill);
    if (skillRow) {
        skillRow['charclass'] = 'bar';
        const skillDeskRow = skilldesc.rows.find(row => row['skilldesc'] === skillRow['skilldesc']);
        if (skillDeskRow) {
            skillDeskRow['SkillPage'] = 3;
            skillDeskRow['IconCel'] = warcryiconcell[index];
        }
    }
});

D2RMM.copyFile(
    'skill_trees', // <mod folder>\hd
    'hd\\global\\ui\\spells\\skill_trees', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
    true // overwrite any conflicts
);

D2RMM.copyFile(
    'spells', // <mod folder>\hd
    'hd\\global\\ui\\spells', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
    true // overwrite any conflicts
);

var skillCategoryIndex = skillsJson.findIndex(entry => entry.Key === "SkillCategoryBa1");
if (skillCategoryIndex !== -1) {
    skillsJson[skillCategoryIndex] = {
        "id": skillsJson[skillCategoryIndex].id, // Use the existing id
        "Key": "SkillCategoryBa1",
        "enUS": "Offensive Auras",
        "zhTW": "攻擊靈氣",
        "deDE": "Offensiv-\nauren",
        "esES": "Auras ofensivas",
        "frFR": "Auras offensives",
        "itIT": "Aure offensive",
        "koKR": "공격 오라",
        "plPL": "Aury Ofensywne",
        "esMX": "Auras ofensivas",
        "jaJP": "攻撃オーラ",
        "ptBR": "Auras ofensivas",
        "ruRU": "Боевые ауры",
        "zhCN": "攻击光环"
    };
}

skillCategoryIndex = skillsJson.findIndex(entry => entry.Key === "SkillCategoryPa2");
if (skillCategoryIndex !== -1) {
    skillsJson[skillCategoryIndex] = {
        "id": skillsJson[skillCategoryIndex].id, // Use the existing id
        "Key": "SkillCategoryPa2",
        "enUS": "Warcries",
        "zhTW": "戰吼",
        "deDE": "Kriegs-\nschreie",
        "esES": "Gritos de guerra",
        "frFR": "Cris de guerre",
        "itIT": "Grida di guerra",
        "koKR": "함성",
        "plPL": "Okrzyki",
        "esMX": "Gritos de guerra",
        "jaJP": "雄叫び",
        "ptBR": "Gritos de guerra",
        "ruRU": "Боевые кличи",
        "zhCN": "呐喊技能"
    };
}

magicprefix.rows.forEach(row => {
    if(row['mod1code'] == 'skilltab')
    {
        if(row['mod1param'] === '10') // Offensive Auras
        {
            row['classspecific'] = 'bar';
            if(row['itype1'] == 'scep')
            {
                row['itype1'] = 'phlm';
            }
        }
        else if(row['mod1param'] === '14') // Warcries
        {
            row['classspecific'] = 'pal';
            if(row['itype1'] == 'phlm')
            {
                row['itype1'] = 'scep';
            }
        }
    }
});

magicsuffix.rows.forEach(row => {
    if (warcrySkills.some(skill => row['Name'] && row['Name'].includes(skill))) {
        row['class'] = 'pal';
        if(row['itype1'] == 'phlm')
        {
            row['itype1'] = 'scep';
        }
    }
    else if (row['Name'] === 'of Potion Finding') {
        row['class'] = 'pal';
        if(row['itype1'] == 'phlm')
        {
            row['itype1'] = 'scep';
        }
    }
});

D2RMM.writeTsv(cubemainFileName, cubemain);
D2RMM.writeTsv(plrTypeFileName, plrType);
D2RMM.writeTsv(playerclassFileName, playerclass);
D2RMM.writeTsv(skillsFileName, skills);
D2RMM.writeTsv(skilldescFilename, skilldesc);
D2RMM.writeJson(skillsJsonFilename, skillsJson);
D2RMM.writeTsv(magicprefixFileName, magicprefix);
D2RMM.writeTsv(magicsuffixFileName, magicsuffix);