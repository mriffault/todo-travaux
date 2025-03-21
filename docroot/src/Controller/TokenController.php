<?php

namespace App\Controller;

use League\Bundle\OAuth2ServerBundle\Model\Client;
use League\OAuth2\Server\AuthorizationServer;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Nyholm\Psr7\Response as Psr7Response;

class TokenController extends AbstractController
{
    private AuthorizationServer $authorizationServer;

    public function __construct(AuthorizationServer $authorizationServer)
    {
        $this->authorizationServer = $authorizationServer;
    }

    #[Route('/api/token', name: 'api_token', methods: ['POST'])]
    public function token(ServerRequestInterface $serverRequest): Response
    {
        $response = $this->authorizationServer->respondToAccessTokenRequest($serverRequest, new Psr7Response());
        
        return new Response(
            $response->getBody(),
            $response->getStatusCode(),
            $response->getHeaders()
        );
    }
}