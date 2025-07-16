package it.epicode.Back_end.security;

import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.exception.UnAuthorizeException;
import it.epicode.Back_end.model.Utente;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTool jwtTool;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization= request.getHeader("Authorization");
        if (authorization==null || !authorization.startsWith("Bearer ")){
            throw new UnAuthorizeException("Non sei autorizzato");
        }else{
            String token=authorization.substring(7);
            jwtTool.validazioneToken(token);
            try{
                Utente utente=jwtTool.UtentedaToken(token);
                Authentication authentication= new UsernamePasswordAuthenticationToken(utente,null,utente.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }catch (NotFoundException e){
              throw new UnAuthorizeException ("Utente collegato al token non trovato");
            }
            filterChain.doFilter(request,response);
        }
    }

    @Override
    protected  boolean shouldNotFilter(HttpServletRequest request){

        return new AntPathMatcher().match("/auth/**",request.getServletPath())
                || new AntPathMatcher().match("/cibo/**",request.getServletPath())
                || new AntPathMatcher().match("/attrezzatura/**",request.getServletPath());
    }

}
