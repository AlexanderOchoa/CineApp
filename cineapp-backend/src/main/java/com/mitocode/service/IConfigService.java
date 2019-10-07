package com.mitocode.service;

import com.mitocode.model.Config;

public interface IConfigService extends ICRUD<Config>{

	Config leerParametro(String param);
}
