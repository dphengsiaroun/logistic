<?php

	class Image {

		public static function manageSession($account, $request) {
			// TODO: Gérer le probleme de la localisation de l'image qui pourrait être en session'
			debug('manageSession $request', $request);
			if (!property_exists($request, 'userNotConnected')) {
				debug('manageSession $request user connected');
				return;
			}
			unset($request->userNotConnected);
			debug('manageSession $request user not connected');
			if (!property_exists($request, 'image')) {
				debug('manageSession $request image not loaded');
				return;
			}
			$imageName = $request->image->name;
			debug('manageSession $imageName', $imageName);
			$dirname = dirname($request->image->url);
			debug('manageSession $dirname', $dirname);
			$session = basename($dirname);
			debug('manageSession $session', $session);
			$sessionDirectory = $session;
			debug('manageSession $sessionDirectory', $sessionDirectory);
			$imageDirectory = 'acct_' . $account->id . '_ad' . $request->imageId;
			debug('manageSession $imageDirectory', $imageDirectory);
			$status = @rename(UPLOAD_DIR . $sessionDirectory, UPLOAD_DIR . $imageDirectory);
			debug('manageSession rename', $status);
			$request->image->url = UPLOAD_URL . $imageDirectory . '/' . $imageName;
			$request->image->thumbnailUrl = UPLOAD_URL . $imageDirectory . '/thumbnail/' . $imageName;
			debug('manageSession $request->image', $request->image);
		}
	}

