/*
################################################################################
#  Pi-monk - An ai technology that works on innovation
#
################################################################################
#
#  Licensed Materials - Property of EBISU TECHNOLOGIES Pvt Ltd,
#  (C) Copyright EBISU Pvt Ltd. 2018,  All rights reserved.
#  Use, duplication or disclosure restricted
#  by Schedule Contract with Ebisu Pvt Ltd.
#
################################################################################
#
#  PROGRAM DESCRIPTION
#
#  <Program Name>            |  <description>
#  Locality Controller        |  All the controller functions for Locality
#                            |  API are defined in this file. Controller
#                            |  functions gets the requested data from the client
#                            |  and execute/perform the actions, send the
#                            |  response to client.
#
#  =============================================================================
#
#  #############################################################################
#
#  REQUIREMENTS  - lodash, request
#
#  #############################################################################
#
#  Change Request - none
#
#  DATE            | Version           | CR#/SPRINT#/       |  PROGRAMMER
#  ————————————————————————————————————————————————————————————————————————————
#  28-08-2018      | v0.1.0            | SPRINT v0.1.0      |  vikash chandra
#                  |                   |                    |
#                  |                   |                    |
################################################################################
*/

'use strict';

import Locality from './locality.model';


/*----------------------------------- Get list of Locality * restriction: 'supadmin'------------------------------*/

export function index(req, res) {
  let documentFields = '-_id -__v';
  Locality.find({}, documentFields, function(err, localities) {
      if (err) return handleError(res, err);
        return res.status(200).send(localities);
  });
};

/*------------------------------------Get a single Locality---------------------------------------------*/

// export function show(req, res) {
//   Locality.findById(req.params.id, function(err, Locality) {
//       if (err)return handleError(res, err);
//       if (!Locality) return handleEntityNotFound(res, 'Locality');
//       return res.status(200).send(Locality);
//   });
// };

/*--------------------------------- Creates a new Locality in the DB.---------------------------------*/

export function create(req, res) {
    Locality.create(req.body, function(err, locality) {
      if (err) return handleError(res, err);
      return res.status(200).send({message: 'Locality successfully Created.'});
    });
};

// /*--------------------------------- Update Locality in the DB.---------------------------------*/

// export function update(req, res) {
//    Locality.findById(req.params.id, function(err, Locality) {
//     if (err) return handleError(res, err);
//       Locality.node_api_id = req.body.node_api_id;
//       Locality.node_api_type = req.body.node_api_type;
//       Locality.node_api_protocol = req.body.node_api_protocol;
//       Locality.node_api_host = req.body.node_api_host;
//       Locality.node_api_port = req.body.node_api_port;
//       Locality.node_api_route = req.body.node_api_route;
//       Locality.node_api_parameters = req.body.node_api_parameters;
//       Locality.node_api_description = req.body.node_api_description;
//       Locality.node_api_example = req.body.node_api_example;
//       Locality.active = req.body.active;
//       let updated_by = {
//         usr_id: req.user.usr_id,
//         usr_name: req.user.usr_name,
//         timestamp: Date.now()
//       }
//       Locality.updated_by = updated_by;
//       Locality.save(function(err) {
//       if (err) return handleError(res, err);
//         return res.status(200).send({message: 'Locality is successfully updated.'});
//       });
//     });
// }

// /*--------------------------------- Deleting Locality in the DB.---------------------------------*/

// export function destroy(req, res) {
//     Locality.findById(req.params.id, function(err, Locality) {
//         if (err) return handleError(res, err);
//         if (!Locality)return handleEntityNotFound(res, 'Locality');
//         Locality.remove(function(err) {
//           if (err) return handleError(res, err);
//           return res.status(200).send({message: 'Locality is successfully Deleted.'});
//         });
//     });
// };

/*---------------------------------Error handler-----------------------------------------------------*/

function handleError(res, err) {
    return res.status(404).send('Something went worng!');
}

/*---------------------------------EntityNotFound Error handler-----------------------------------------------------*/

function handleEntityNotFound(res, entity) {
  return res.status(403).send(entity + ' not found!');
}
/*--------------------------------------------------------------------------------------------------*/
