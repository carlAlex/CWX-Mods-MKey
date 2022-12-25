import { HandbookHelper } from "../helpers/HandbookHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { Preset } from "../models/eft/common/IGlobals";
import { Item } from "../models/eft/common/tables/IItem";
import { IBarterScheme } from "../models/eft/common/tables/ITrader";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { IRagfairServerPrices } from "../models/spt/ragfair/IRagfairServerPrices";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { RandomUtil } from "../utils/RandomUtil";
import { OnLoad } from "../di/OnLoad";
export declare class RagfairPriceService implements OnLoad {
    protected handbookHelper: HandbookHelper;
    protected databaseServer: DatabaseServer;
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected randomUtil: RandomUtil;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    protected generatedDynamicPrices: boolean;
    protected generatedStaticPrices: boolean;
    protected prices: IRagfairServerPrices;
    constructor(handbookHelper: HandbookHelper, databaseServer: DatabaseServer, logger: ILogger, itemHelper: ItemHelper, presetHelper: PresetHelper, randomUtil: RandomUtil, configServer: ConfigServer);
    onLoad(): Promise<void>;
    getRoute(): string;
    /**
     * Iterate over all items of type "Item" in db and get template price, store in cache
     */
    generateStaticPrices(): void;
    protected generateDynamicPrices(): void;
    /**
     * Get the dynamic price for an item. If value doesn't exist, use static (handbook0) value.
     * if no static value, return 1
     * @param tplId Item tpl id to get price for
     * @returns price in roubles
     */
    getFleaPriceForItem(tplId: string): number;
    /**
     * get the dynamic (flea) price for an item
     * Grabs prices from prices.json and stores in class if none currently exist
     * @param itemTpl item template id to look up
     * @returns price in roubles
     */
    getDynamicPriceForItem(itemTpl: string): number;
    /**
     * Grab the static (handbook) for an item by its tplId
     * @param itemTpl item template id to look up
     * @returns price in roubles
     */
    getStaticPriceForItem(itemTpl: string): number;
    getAllFleaPrices(): Record<string, number>;
    /**
     * Get the percentage difference between two values
     * @param a numerical value a
     * @param b numerical value b
     * @returns different in percent
     */
    protected getPriceDifference(a: number, b: number): number;
    getBarterPrice(barterScheme: IBarterScheme[]): number;
    getDynamicOfferPrice(items: Item[], desiredCurrency: string): number;
    /**
     * Check to see if an items price is below its handbook price and adjust accoring to values set to config/ragfair.json
     * @param itemPrice price of item
     * @param itemTpl item template Id being checked
     * @returns adjusted price value in roubles
     */
    protected adjustPriceIfBelowHandbook(itemPrice: number, itemTpl: string): number;
    /**
     * Multiply the price by a randomised curve where n = 2, shift = 2
     * @param existingPrice price to alter
     * @param isPreset is the item we're multiplying a preset
     * @returns multiplied price
     */
    protected randomisePrice(existingPrice: number, isPreset: boolean): number;
    /**
     * Calculate the cost of a weapon preset by adding together the price of its mods + base price of default weapon preset
     * @param item base weapon
     * @param items weapon plus mods
     * @param existingPrice price of existing base weapon
     * @returns
     */
    protected getWeaponPresetPrice(item: Item, items: Item[], existingPrice: number): number;
    /**
     * Attempt to get the default preset for a weapon, failing that get the first preset in the array
     * (assumes default = has encyclopedia entry)
     * @param presets weapon presets to choose from
     * @returns Default preset object
     */
    protected getDefaultWeaponPreset(presets: Preset[], weapon: Item): Preset;
}
