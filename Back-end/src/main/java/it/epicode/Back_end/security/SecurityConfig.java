package it.epicode.Back_end.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.formLogin(http->http.disable());
        //serve per evitare la possibilità di utilizzi aperte
        httpSecurity.csrf(http->http.disable());
        //
        httpSecurity.sessionManagement(http->http.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        //serve per bloccare richieste che provengono da domini (indirizzi ip e porta) esterni a quelli di servizio
        httpSecurity.cors(Customizer.withDefaults());

        httpSecurity.authorizeHttpRequests(http->http.requestMatchers("/","/auth/**").permitAll());
        httpSecurity.authorizeHttpRequests(http->http.requestMatchers("/admin/**").hasRole("ADMIN"));
        httpSecurity.authorizeHttpRequests(http->http.anyRequest().authenticated());
        return httpSecurity.build();
    }


}
