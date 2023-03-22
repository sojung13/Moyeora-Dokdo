package com.ssafy.dokdo.Security.oauth2.user;

import java.util.Map;
public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    private final String RESPONSE = "response";

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        Map<String, Object> response = (Map<String, Object>) attributes.get(RESPONSE);
        if (response == null)      return null;
        return (String) response.get("id");
    }

    @Override
    public String getName() {
        Map<String, Object> response = (Map<String, Object>) attributes.get(RESPONSE);
        if (response == null)      return null;
        return (String) response.get("nickname");
    }

    @Override
    public String getEmail() {
        Map<String, Object> response = (Map<String, Object>) attributes.get(RESPONSE);
        if (response == null)      return null;
        return (String) response.get("email");
    }

}
