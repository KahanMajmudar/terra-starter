use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::Addr;
use cw_storage_plus::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    // pub count: i32,
    pub gen_num: i32,
    pub owner: Addr,
}

pub const STATE: Item<State> = Item::new("state");
