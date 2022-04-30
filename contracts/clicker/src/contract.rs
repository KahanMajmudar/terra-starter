#[cfg(not(feature = "library"))]
// Imports
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{GenNumResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};

// constants
// & === read-only
const CONTRACT_NAME: &str = "crates.io:clicker";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
// constructor
// DepsMut for mutable
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    // storing in variable called 'state' of type 'State'
    let state = State {
        gen_num: msg.gen_num,
        owner: info.sender.clone(),
    };

    // setting contract version
    // ? to propogate errors
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    // storing state in STATE
    STATE.save(deps.storage, &state)?;

    // return values need to be strings
    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender)
        .add_attribute("count", msg.gen_num.to_string()))
}

// Deps for non mutable
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetGenNum {} => to_binary(&query_count(deps)?),
    }
}

fn query_count(deps: Deps) -> StdResult<GenNumResponse> {
    let state = STATE.load(deps.storage)?;
    Ok(GenNumResponse {
        gen_num: state.gen_num,
    })
}
