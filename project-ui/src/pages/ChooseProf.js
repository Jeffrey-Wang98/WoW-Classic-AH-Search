import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


export const ChooseProf = ( {setProfItems, setProfession, realm, faction, setRealm, setFaction } ) => {
    const [prof, setProf]                       = useState('');

    const history = useHistory();

    const auctionHouseList = {
        Atiesh: [279, 280],
        Myzrael: [281, 282],
        Old_Blanchy: [283, 284],
        Azuresong: [285, 286],
        Mankrik: [287, 288],
        Pagle: [289, 290],
        Ashkandi: [293, 294],
        Westfall: [295, 296],
        Whitemane: [297, 298],
        Faerlina: [311, 312],
        Grobbulus: [317, 318],
        Bloodsail_Buccaneers: [319, 320],
        Remulos: [321, 322],
        Arugal: [323, 324],
        Yojamba: [325, 326],
        Sulfuras: [343, 344],
        Windseeker: [345, 346],
        Benediction: [347, 348],
        Earthfury: [351, 352],
        Skyfury: [461, 462],
        Maladath: [463, 464],
        Eranikus: [471, 472],
        Angerforge: [473, 474]
    };

    const alchemy = {
        0: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_flower_02.jpg',
            name: "Peacebloom",
            itemId: 2447,
            quantity: 65
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_10.jpg',
            name: "Silverleaf",
            itemId: 765,
            quantity: 65
        },
        2: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_root_01.jpg',
            name: "Briarthorn",
            itemId: 2450,
            quantity: 100
        },
        3: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_01.jpg',
            name: "Bruiseweed",
            itemId: 2453,
            quantity: 35
        },
        4: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_jewelry_talisman_03.jpg',
            name: "Mageroyal",
            itemId: 785,
            quantity: 20
        },
        5: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_11.jpg',
            name: "Stranglekelp",
            itemId: 3820,
            quantity: 50
        },
        6: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_root_02.jpg',
            name: "Liferoot",
            itemId: 3357,
            quantity: 35
        },
        7: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_03.jpg',
            name: "Kingsblood",
            itemId: 3356,
            quantity: 35
        },
        8: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_15.jpg',
            name: "Goldthorn",
            itemId: 3821,
            quantity: 30
        },
        9: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_flower_01.jpg',
            name: "Wild Steelbloom",
            itemId: 3355,
            quantity: 5
        },
        10: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_18.jpg',
            name: "Sungrass",
            itemId: 8838,
            quantity: 75
        },
        11: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_08.jpg',
            name: "Khadgar's Whisker",
            itemId: 3358,
            quantity: 15
        },
        12: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_iron.jpg',
            name: "Iron Bar",
            itemId: 3575,
            quantity: 4
        },
        13: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_sapphire_03.jpg',
            name: "Black Vitriol",
            itemId: 9262,
            quantity: 1
        },
        14: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_17.jpg',
            name: "Purple Lotus",
            itemId: 8831,
            quantity: 4
        },
        15: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_19.jpg',
            name: "Firebloom",
            itemId: 4625,
            quantity: 4
        },
        16: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_13.jpg',
            name: "Arthas' Tears",
            itemId: 8836,
            quantity: 45
        },
        17: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_14.jpg',
            name: "Blindweed",
            itemId: 8839,
            quantity: 60
        },
        18: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_sansamroot.jpg',
            name: "Golden Sansam",
            itemId: 13464,
            quantity: 75
        },
        19: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_mountainsilversage.jpg',
            name: "Mountain Silversage",
            itemId: 13465,
            quantity: 40
        },
        20: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_felweed.jpg',
            name: "Felweed",
            itemId: 22785,
            quantity: 35
        },
        21: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_mountainsilversage.jpg',
            name: "Mountain Silversage, Dreamfoil, or Golden Sansam",
            itemId: 13465,
            quantity: 15
        },
        22: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_sansamroot.jpg',
            name: "Golden Sansam",
            itemId: 13464,
            quantity: 30
        },
        23: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_terrocone.jpg',
            name: "Terocone",
            itemId: 22789,
            quantity: 5
        },
        24: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_dreamingglory.jpg',
            name: "Dreaming Glory",
            itemId: 22786,
            quantity: 45
        },
        25: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_netherbloom.jpg',
            name: "Netherbloom",
            itemId: 22791,
            quantity: 10
        },
        26: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_talandrasrose.jpg',
            name: "Talandra's Rose",
            itemId: 36907,
            quantity: 24
        },
        27: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_fish_55.jpg',
            name: "Pygmy Suckerfish",
            itemId: 40199,
            quantity: 5
        },
        28: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_goldclover.jpg',
            name: "Goldclover",
            itemId: 36901,
            quantity: 90
        },
        29: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_tigerlily.jpg',
            name: "Tiger Lily",
            itemId: 36904,
            quantity: 35
        },
        30: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_evergreenmoss.jpg',
            name: "Adder's Tongue",
            itemId: 36903,
            quantity: 34
        },
        31: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_icethorn.jpg',
            name: "Icethorn",
            itemId: 36906,
            quantity: 20
        },
        32: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_whispervine.jpg',
            name: "Lichbloom",
            itemId: 36905,
            quantity: 40
        },
        33: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_yoggthorite.jpg',
            name: "Saronite Bar",
            itemId: 36913,
            quantity: 56
        },
        34: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_jewelcrafting_gem_12.jpg',
            name: "Bloodstone or Dark Jade",
            itemId: 36917,
            quantity: 5
        },
        35: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_jewelcrafting_gem_10.jpg',
            name: "Chalcedony or Huge Citrine",
            itemId: 36923,
            quantity: 5
        },
        36: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_air.jpg',
            name: "Eternal Air or Eternal Fire",
            itemId: 35623,
            quantity: 5
        },
        37: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_icethorn.jpg',
            name: "Icethorn",
            itemId: 36906,
            quantity: 105
        },
        38: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_potion_07.jpg',
            name: "Pygmy Oil",
            itemId: 40195,
            quantity: 45
        },
        39: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_frostlotus.jpg',
            name: "Frost Lotus",
            itemId: 36908,
            quantity: 15
        }
    }

    const blacksmithing = {
        0: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_06.jpg',
            name: "Rough Stone",
            itemId: 2835,
            quantity: 150
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_02.jpg',
            name: "Copper Bar",
            itemId: 2840,
            quantity: 150
        },
        2: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_09.jpg',
            name: "Coarse Stone",
            itemId: 2836,
            quantity: 90
        },
        3: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_01.jpg',
            name: "Silver Bar",
            itemId: 2842,
            quantity: 5
        },
        4: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_bronze.jpg',
            name: "Bronze Bar",
            itemId: 2841,
            quantity: 140
        },
        5: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_12.jpg',
            name: "Heavy Stone",
            itemId: 3820,
            quantity: 105
        },
        6: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_03.jpg',
            name: "Gold Bar",
            itemId: 3577,
            quantity: 5
        },
        7: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_iron.jpg',
            name: "Iron Bar",
            itemId: 3575,
            quantity: 230
        },
        8: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_steel.jpg',
            name: "Steel Bar",
            itemId: 3859,
            quantity: 190
        },
        9: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_opal_02.jpg',
            name: "Citrine",
            itemId: 3864,
            quantity: 10
        },
        10: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_10.jpg',
            name: "Solid Stone",
            itemId: 7912,
            quantity: 120
        },
        11: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_mageweave_01.jpg',
            name: "Mageweave Cloth",
            itemId: 4338,
            quantity: 150
        },
        12: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_06.jpg',
            name: "Mithril Bar",
            itemId: 3860,
            quantity: 240
        },
        13: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_stonetablet_07.jpg',
            name: "Dense Stone",
            itemId: 12365,
            quantity: 20
        },
        14: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_07.jpg',
            name: "Thorium Bar",
            itemId: 12359,
            quantity: 420
        },
        15: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_leatherscrap_02.jpg',
            name: "Rugged Leather",
            itemId: 8170,
            quantity: 80
        },
        16: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_feliron.jpg',
            name: "Fel Iron Bar",
            itemId: 23445,
            quantity: 170
        },
        17: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_netherweave.jpg',
            name: "Netherweave Cloth",
            itemId: 21877,
            quantity: 10
        },
        18: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_10.jpg',
            name: "Adamantite Bar",
            itemId: 23446,
            quantity: 90
        },
        19: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_cobalt.jpg',
            name: "Cobalt Bar (Farm Plans: Reinforced Cobalt Chestpiece)",
            itemId: 36916,
            quantity: 408
        },
        20: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_yoggthorite.jpg',
            name: "Saronite Bar",
            itemId: 36913,
            quantity: 633
        },
        21: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_crystal_water.jpg',
            name: "Crystallized Water",
            itemId: 37705,
            quantity: 4
        },
        22: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_platinum.jpg',
            name: "Titanium Bar",
            itemId: 41163,
            quantity: 7
        },
        23: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_shadow.jpg',
            name: "Eternal Shadow",
            itemId: 35627,
            quantity: 13
        },
        24: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_water.jpg',
            name: "Eternal Water",
            itemId: 35622,
            quantity: 57
        },
        25: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_earth.jpg',
            name: "Eternal Earth",
            itemId: 35624,
            quantity: 13
        }
    }

    const enchanting = {
        0: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_duststrange.jpg',
            name: "Strange Dust",
            itemId: 10940,
            quantity: 125
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essencemagicsmall.jpg',
            name: "Lesser Magic Essence",
            itemId: 10938,
            quantity: 1
        },
        2: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essencemagiclarge.jpg',
            name: "Greater Magic Essence",
            itemId: 10939,
            quantity: 12
        },
        3: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essenceastralsmall.jpg',
            name: "Lesser Astral Essence",
            itemId: 10998,
            quantity: 25
        },
        4: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_dustsoul.jpg',
            name: "Soul Dust",
            itemId: 11083,
            quantity: 130
        },
        5: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essenceastrallarge.jpg',
            name: "Greater Astral Essence",
            itemId: 11082,
            quantity: 2
        },
        6: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_dustvision.jpg',
            name: "Vision Dust",
            itemId: 11137,
            quantity: 240
        },
        7: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essencemysticallarge.jpg',
            name: "Greater Mystic Essence",
            itemId: 11135,
            quantity: 2
        },
        8: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essencenethersmall.jpg',
            name: "Lesser Nether Essence",
            itemId: 11174,
            quantity: 5
        },
        9: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_dustdream.jpg',
            name: "Dream Dust",
            itemId: 11176,
            quantity: 195
        },
        10: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_17.jpg',
            name: "Purple Lotus",
            itemId: 8831,
            quantity: 40
        },
        11: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_dustillusion.jpg',
            name: "Illusion Dust",
            itemId: 16204,
            quantity: 82
        },
        12: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essenceeternallarge.jpg',
            name: "Greater Eternal Essence",
            itemId: 16203,
            quantity: 8
        },
        13: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_shardbrilliantlarge.jpg',
            name: "Large Brilliant Shard",
            itemId: 14344,
            quantity: 8
        },
        14: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_staff_01.jpg',
            name: "Silver Rod",
            itemId: 6338,
            quantity: 1
        },
        15: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_staff_10.jpg',
            name: "Golden Rod",
            itemId: 11128,
            quantity: 1
        },
        16: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_pearl_02.jpg',
            name: "Iridescent Pearl",
            itemId: 5500,
            quantity: 1
        },
        17: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_staff_11.jpg',
            name: "Truesilver Rod",
            itemId: 11144,
            quantity: 1
        },
        18: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_pearl_01.jpg',
            name: "Black Pearl",
            itemId: 7971,
            quantity: 1
        },
        19: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_staff_19.jpg',
            name: "Arcanite Rod",
            itemId: 16206,
            quantity: 1
        },
        20: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_pearl_04.jpg',
            name: "Golden Pearl",
            itemId: 13926,
            quantity: 1
        },
        21: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_rod_felsteel.jpg',
            name: "Fel Iron Rod",
            itemId: 25843,
            quantity: 1
        },
        22: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_dustarcane.jpg',
            name: "Arcane Dust",
            itemId: 22445,
            quantity: 350
        },
        23: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essencearcanesmall.jpg',
            name: "Lesser Planar Essence",
            itemId: 22447,
            quantity: 2
        },
        24: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essencearcanelarge.jpg',
            name: "Greater Planar Essence",
            itemId: 22446,
            quantity: 20
        },
        25: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_nightmarevine.jpg',
            name: "Nightmare Vine",
            itemId: 22792,
            quantity: 15
        },
        26: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_shardprismaticlarge.jpg',
            name: "Large Prismatic Shard",
            itemId: 22449,
            quantity: 13
        },
        27: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_rod_adamantite.jpg',
            name: "Adamantite Rod",
            itemId: 25844,
            quantity: 1
        },
        28: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/spell_nature_lightningoverload.jpg',
            name: "Primal Might",
            itemId: 23571,
            quantity: 1
        },
        29: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_rod_eternium.jpg',
            name: "Eternium Rod",
            itemId: 25845,
            quantity: 1
        },
        30: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_dust_infinite.jpg',
            name: "Infinite Dust",
            itemId: 34054,
            quantity: 742
        },
        31: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_essencecosmicgreater.jpg',
            name: "Greater Cosmic Essence",
            itemId: 34055,
            quantity: 47
        },
        32: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_enchant_dreamshard_02.jpg',
            name: "Dream Shard",
            itemId: 34052,
            quantity: 60
        },
        33: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_earth.jpg',
            name: "Eternal Earth",
            itemId: 35624,
            quantity: 134
        },
        34: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_crystal_water.jpg',
            name: "Crystallized Water",
            itemId: 37705,
            quantity: 10
        },
        35: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_rod_platinum.jpg',
            name: "Titanium Rod",
            itemId: 41745,
            quantity: 1
        }
    }

    const engineering = {
        0: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_06.jpg',
            name: "Rough Stone",
            itemId: 2835,
            quantity: 60
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_02.jpg',
            name: "Copper Bar",
            itemId: 2840,
            quantity: 66
        },
        2: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_09.jpg',
            name: "Coarse Stone",
            itemId: 2836,
            quantity: 60
        },
        3: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_linen_01.jpg',
            name: "Linen Cloth",
            itemId: 2589,
            quantity: 50
        },
        4: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_01.jpg',
            name: "Silver Bar",
            itemId: 2842,
            quantity: 5
        },
        5: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_bronze.jpg',
            name: "Bronze Bar",
            itemId: 2841,
            quantity: 110
        },
        6: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_12.jpg',
            name: "Heavy Stone",
            itemId: 3820,
            quantity: 60
        },
        7: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_wool_01.jpg',
            name: "Wool Cloth",
            itemId: 2592,
            quantity: 60
        },
        8: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_leatherscrap_05.jpg',
            name: "Medium Leather",
            itemId: 2319,
            quantity: 15
        },
        9: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_steel.jpg',
            name: "Steel Bar",
            itemId: 3859,
            quantity: 4
        },
        10: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_10.jpg',
            name: "Solid Stone",
            itemId: 7912,
            quantity: 120
        },
        11: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_06.jpg',
            name: "Mithril Bar",
            itemId: 3860,
            quantity: 170
        },
        12: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_mageweave_01.jpg',
            name: "Mageweave Cloth",
            itemId: 4338,
            quantity: 20
        },
        13: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_stonetablet_07.jpg',
            name: "Dense Stone",
            itemId: 12365,
            quantity: 60
        },
        14: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_07.jpg',
            name: "Thorium Bar",
            itemId: 12359,
            quantity: 135
        },
        15: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_purplefire_01.jpg',
            name: "Runecloth",
            itemId: 14047,
            quantity: 35
        },
        16: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_feliron.jpg',
            name: "Fel Iron Bar",
            itemId: 23445,
            quantity: 70
        },
        17: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_mote_earth01.jpg',
            name: "Mote of Earth",
            itemId: 22573,
            quantity: 40
        },
        18: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_mote_fire01.jpg',
            name: "Mote of Fire",
            itemId: 22574,
            quantity: 20
        },
        19: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_netherweave.jpg',
            name: "Netherweave Cloth",
            itemId: 21877,
            quantity: 70
        },
        20: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_10.jpg',
            name: "Adamantite Bar",
            itemId: 23446,
            quantity: 40
        },
        21: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_cobalt.jpg',
            name: "Cobalt Bar",
            itemId: 36916,
            quantity: 280
        },
        22: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_yoggthorite.jpg',
            name: "Saronite Bar",
            itemId: 36913,
            quantity: 555
        },
        23: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_soulcloth.jpg',
            name: "Frostweave Cloth",
            itemId: 33470,
            quantity: 7
        },
        24: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_crystal_water.jpg',
            name: "Crystallized Water",
            itemId: 37705,
            quantity: 8
        },
        25: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_water.jpg',
            name: "Eternal Water",
            itemId: 35622,
            quantity: 6
        },
        26: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_earth.jpg',
            name: "Eternal Earth",
            itemId: 35624,
            quantity: 1
        },
        27: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_crystal_fire.jpg',
            name: "Crystallized Fire",
            itemId: 37702,
            quantity: 5
        },
        28: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_fire.jpg',
            name: "Eternal Fire",
            itemId: 36860,
            quantity: 1
        },
        29: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_leatherscrap_15.jpg',
            name: "Borean Leather",
            itemId: 33568,
            quantity: 14
        },
        30: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_shadow.jpg',
            name: "Eternal Shadow",
            itemId: 35627,
            quantity: 7
        }
    }

    const inscription = {
        0: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_07.jpg',
            name: "Earthroot, Peacebloom, or Silverleaf",
            itemId: 2449,
            quantity: 120
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_jewelry_talisman_03.jpg',
            name: "Mageroyal, Briarthorn, Bruiseweed, Stranglekelp, or Swiftthistle",
            itemId: 785,
            quantity: 110
        },
        2: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_root_02.jpg',
            name: "Liferoot, Grave Moss, Kingsblood, or Wild Steelbloom",
            itemId: 3357,
            quantity: 170
        },
        3: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_15.jpg',
            name: "Goldthorn, Khadgar's Whiskers, Fadeleaf, or Wintersbite",
            itemId: 3821,
            quantity: 180
        },
        4: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_19.jpg',
            name: "Firebloom, Arthas' Tears, Blindweed, Ghost Mushroom, Gromsblood, Purple Lotus, or Sungrass",
            itemId: 4625,
            quantity: 240
        },
        5: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_dreamfoil.jpg',
            name: "Dreamfoil, Golden Sansam, Icecap, Mountain Silversage, or Plaguebloom",
            itemId: 13463,
            quantity: 120
        },
        6: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_ancientlichen.jpg',
            name: "Ancient Lichen, Felweed, Ragveil, Terocone, Nightmare Vine, Netherbloom, Mana Thistle, or Dreaming Glory",
            itemId: 22790,
            quantity: 180
        },
        7: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_tigerlily.jpg',
            name: "Tiger Lily, Icethorn, Lichbloom, Fire Leaf, Fire Seed, Adder's Tongue, Deadnettle, Goldclover, or Talandra's Rose",
            itemId: 36904,
            quantity: 500
        }
    }

    const jewelcrafting = {
        0: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_02.jpg',
            name: "Copper Bar",
            itemId: 2840,
            quantity: 110
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_emerald_03.jpg',
            name: "Malachite or Tigerseye",
            itemId: 774,
            quantity: 15
        },
        2: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_bronze.jpg',
            name: "Bronze Bar",
            itemId: 2841,
            quantity: 120
        },
        3: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_01.jpg',
            name: "Silver Bar",
            itemId: 2842,
            quantity: 40
        },
        4: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_amethyst_01.jpg',
            name: "Shadowgem",
            itemId: 1210,
            quantity: 20
        },
        5: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_12.jpg',
            name: "Heavy Stone",
            itemId: 3820,
            quantity: 80
        },
        // Left off here: Need Lesser Moonstone
        6: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_03.jpg',
            name: "Gold Bar",
            itemId: 3577,
            quantity: 5
        },
        7: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_iron.jpg',
            name: "Iron Bar",
            itemId: 3575,
            quantity: 230
        },
        8: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_steel.jpg',
            name: "Steel Bar",
            itemId: 3859,
            quantity: 190
        },
        9: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_gem_opal_02.jpg',
            name: "Citrine",
            itemId: 3864,
            quantity: 10
        },
        10: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_stone_10.jpg',
            name: "Solid Stone",
            itemId: 7912,
            quantity: 120
        },
        11: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_mageweave_01.jpg',
            name: "Mageweave Cloth",
            itemId: 4338,
            quantity: 150
        },
        12: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_06.jpg',
            name: "Mithril Bar",
            itemId: 3860,
            quantity: 240
        },
        13: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_stonetablet_07.jpg',
            name: "Dense Stone",
            itemId: 12365,
            quantity: 20
        },
        14: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_07.jpg',
            name: "Thorium Bar",
            itemId: 12359,
            quantity: 420
        },
        15: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_leatherscrap_02.jpg',
            name: "Rugged Leather",
            itemId: 8170,
            quantity: 80
        },
        16: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_feliron.jpg',
            name: "Fel Iron Bar",
            itemId: 23445,
            quantity: 170
        },
        17: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_fabric_netherweave.jpg',
            name: "Netherweave Cloth",
            itemId: 21877,
            quantity: 10
        },
        18: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_10.jpg',
            name: "Adamantite Bar",
            itemId: 23446,
            quantity: 90
        },
        19: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_cobalt.jpg',
            name: "Cobalt Bar (Farm Plans: Reinforced Cobalt Chestpiece)",
            itemId: 36916,
            quantity: 408
        },
        20: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_yoggthorite.jpg',
            name: "Saronite Bar",
            itemId: 36913,
            quantity: 633
        },
        21: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_crystal_water.jpg',
            name: "Crystallized Water",
            itemId: 37705,
            quantity: 4
        },
        22: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_ingot_platinum.jpg',
            name: "Titanium Bar",
            itemId: 41163,
            quantity: 7
        },
        23: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_shadow.jpg',
            name: "Eternal Shadow",
            itemId: 35627,
            quantity: 13
        },
        24: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_water.jpg',
            name: "Eternal Water",
            itemId: 35622,
            quantity: 57
        },
        25: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_elemental_eternal_earth.jpg',
            name: "Eternal Earth",
            itemId: 35624,
            quantity: 13
        }
    }

    const leatherworking = {
        0: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_whispervine.jpg',
            name: "Lichbloom",
            itemId: 36905,
            quantity: 80
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_potion_07.jpg',
            name: "Pygmy Oil",
            itemId: 40195,
            quantity: 80
        },
        2: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_evergreenmoss.jpg',
            name: "Adder's Tongue",
            itemId: 36903,
            quantity: 80
        }
    }

    const tailoring = {
        0: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_whispervine.jpg',
            name: "Lichbloom",
            itemId: 36905,
            quantity: 80
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_potion_07.jpg',
            name: "Pygmy Oil",
            itemId: 40195,
            quantity: 80
        },
        2: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_evergreenmoss.jpg',
            name: "Adder's Tongue",
            itemId: 36903,
            quantity: 80
        }
    }

    const cooking = {
        0: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_whispervine.jpg',
            name: "Lichbloom",
            itemId: 36905,
            quantity: 80
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_potion_07.jpg',
            name: "Pygmy Oil",
            itemId: 40195,
            quantity: 80
        },
        2: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_evergreenmoss.jpg',
            name: "Adder's Tongue",
            itemId: 36903,
            quantity: 80
        }
    }

    const firstAid = {
        0: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_whispervine.jpg',
            name: "Lichbloom",
            itemId: 36905,
            quantity: 80
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_potion_07.jpg',
            name: "Pygmy Oil",
            itemId: 40195,
            quantity: 80
        },
        2: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_evergreenmoss.jpg',
            name: "Adder's Tongue",
            itemId: 36903,
            quantity: 80
        }
    }

    const chooseArray = () => {
        switch (prof) {
            case 'Alchemy':
                return alchemy;
            case 'Blacksmithing':
                return blacksmithing;
            case 'Enchanting':
                return enchanting;
            case 'Engineering':
                return engineering;
            case 'Inscription':
                return inscription;
            case 'Jewelcrafting':
                return jewelcrafting;
            case 'Leatherworking':
                return leatherworking;
            case 'Tailoring':
                return tailoring;
            case 'Cooking':
                return cooking;
            case 'First Aid':
                return firstAid;
            default:
                return [];
        }
    }

    // calls micro-service to get json of all prices in same order as items given
    const getPrices = async (itemsForMicro) => {
        return fetch(
        "http://localhost:9000", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            mode: 'cors',
            body: JSON.stringify(itemsForMicro)
        });
    }


    // Get auctionHouseID
    const getAHID = () => {
        if (faction === "Alliance") {
            return auctionHouseList[realm][0];
        }
        else {
            return auctionHouseList[realm][1];
        }
    }
    // generate profession item price list
    const chooseProf = async () => {
        if (realm === "" || faction === "" || prof === "") {
            alert("Please enter a valid Realm, Faction, and/or Profession.")
        }
        else {
            setProfession(prof);
            let items = []
            let selectedArray = chooseArray();
            
            // Set auctionHouseID
            const auctionHouseID = getAHID();            

            let itemsForMicro = [];
            for (let i in selectedArray) {
                let item = {
                    itemId: selectedArray[i].itemId,
                    auctionHouseId: auctionHouseID
                };
                itemsForMicro.push(item);
            }
            
            let apiPrices = await getPrices(itemsForMicro);
            if (apiPrices.status === 200) {
                alert("Your profession list has been generated!");
                apiPrices = await apiPrices.json();

                for (let i in selectedArray) {
                    let item = {
                        icon: selectedArray[i].icon,
                        name: selectedArray[i].name,
                        currentPrice: apiPrices[i],
                        quantity: selectedArray[i].quantity,
                    };
                    items.push(item);
                }

                setProfItems(JSON.parse(JSON.stringify(items)));
            }
            else {
                alert("There was an error preventing the generation of the professsion list.")
            }

            history.push('/professions');
        }
    }

    return(
        <article>
            <h2>Choose Your Realm, Faction, and Profession!</h2>
            <p>
                Please choose the Realm and Faction your character is in and which profession
                you want to level from 1 to 450.
            </p>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <table class="choose">
                    <caption>Choose Your Profession!</caption>
                    <thead>
                        <tr>
                            <th>Realm Name</th>
                            <th>Faction</th>
                            <th>Profession</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>
                            <select 
                                name="realm"
                                id="realm"
                                onChange={e => setRealm(e.target.value)}
                            >
                                <option disable selected value class="empty">-Select a Realm-</option>
                                <option value="Atiesh">Atiesh</option>
                                <option value="Myzrael">Myzrael</option>
                                <option value="Old_Blanchy">Old Blanchy</option>
                                <option value="Azuresong">Azuresong</option>
                                <option value="Mankrik">Mankrik</option>
                                <option value="Pagle">Pagle</option>
                                <option value="Ashkandi">Ashkandi</option>
                                <option value="Westfall">Westfall</option>
                                <option value="Whitemane">Whitemane</option>
                                <option value="Faerlina">Faerlina</option>
                                <option value="Grobbulus">Grobbulus</option>
                                <option value="Bloodsail_Buccaneers">Bloodsail Buccaneers</option>
                                <option value="Remulos">Remulos</option>
                                <option value="Arugal">Arugal</option>
                                <option value="Yojamba">Yojamba</option>
                                <option value="Sulfuras">Sulfuras</option>
                                <option value="Windseeker">Windseeker</option>
                                <option value="Benediction">Benediction</option>
                                <option value="Earthfury">Earthfury</option>
                                <option value="Skyfury">Skyfury</option>
                                <option value="Maladath">Maladath</option>
                                <option value="Angerforge">Angerforge</option> 
                            </select>
                        </td>
                        <td>
                            <select
                                name="faction"
                                id="faction"
                                onChange={e => setFaction(e.target.value)}
                            >
                                <option disable selected value class="empty">-Select a Faction-</option>
                                <option value="Alliance">Alliance</option>
                                <option value="Horde">Horde</option>
                            </select>
                        </td>
                        <td>
                            <select
                                name="profession"
                                id="profession"
                                onChange={e => setProf(e.target.value)}
                            >
                                <option disable selected value class="empty">-Select a Profession-</option>
                                <option value="Alchemy">Alchemy</option>
                                <option value="Blacksmithing">Blacksmithing</option>
                                <option value="Enchanting">Enchanting</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Inscription">Inscription</option>
                                <option value="Jewelcrafting">Jewelcrafting</option>
                                <option value="Leatherworking">Leatherworking</option>
                                <option value="Tailoring">Tailoring</option>
                                <option value="Cooking">Cooking</option>
                                <option value="First Aid">First Aid</option>
                            </select>
                        </td>
                    </tbody>
                </table>
                <button
                    type="submit"
                    onClick={chooseProf}
                    id="submit"
                >Choose</button>
            </form>
        </article>
    );
}

export default ChooseProf;